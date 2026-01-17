import { NextResponse } from "next/server";
import { Resend } from "resend";

import { isValidLithuanianMobileNumber } from "@/lib/phone-validation";
import type { ContactFormData } from "@/types";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactRequestBody {
  data: ContactFormData;
}

function validateFormData(data: unknown): data is ContactFormData {
  if (
    typeof data === "object" &&
    data !== null &&
    "solution" in data &&
    "name" in data &&
    "city" in data &&
    "email" in data &&
    "phone" in data &&
    "comment" in data
  ) {
    const formData = data as ContactFormData;
    return (
      (formData.solution === "namams" || formData.solution === "verslui") &&
      typeof formData.name === "string" &&
      formData.name.trim().length > 0 &&
      typeof formData.city === "string" &&
      formData.city.trim().length > 0 &&
      typeof formData.email === "string" &&
      emailRegex.test(formData.email) &&
      typeof formData.phone === "string" &&
      isValidLithuanianMobileNumber(formData.phone) &&
      typeof formData.comment === "string" &&
      formData.comment.trim().length > 0
    );
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 },
      );
    }

    const jsonData = await request.json();
    const body = jsonData as ContactRequestBody;
    const { data } = body;

    if (!validateFormData(data)) {
      return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
    }

    const solutionText = data.solution === "namams" ? "Namams" : "Verslui";

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nauja užklausa iš svetainės</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #021614; padding: 20px; text-align: center;">
          <h1 style="color: #ffbc85; margin: 0;">SECURITY GURU</h1>
          <p style="color: #c3c9b5; margin: 10px 0 0 0;">Nauja užklausa iš svetainės</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <h2 style="color: #021614; margin-top: 0;">Užklausos informacija</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Sprendimas:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${solutionText}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Vardas/Įmonė:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Miestas:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${escapeHtml(data.city)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">El. paštas:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${escapeHtml(data.email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd; font-weight: bold;">Tel. Nr.:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #ddd;">${escapeHtml(data.phone)}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <strong>Komentaras:</strong>
            <p style="background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd; margin-top: 10px;">${escapeHtml(
              data.comment,
            )}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px;">
          <p>Ši žinutė išsiųsta iš SECURITY GURU svetainės kontaktų formos.</p>
          <p>© ${new Date().getFullYear()} SECURITY GURU. Visos teisės saugomos.</p>
        </div>
      </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: "Security Guru <noreply@securityguru.lt>",
      to: ["info@securityguru.lt"],
      subject: `Nauja užklausa iš svetainės - ${escapeHtml(data.name)}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("Contact form error:");
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

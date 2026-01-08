"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { ContactFormData, ContactFormErrors } from "@/types";

// Lithuanian phone number validation regex
const lithuanianPhoneRegex = /^(\+370|8)\d{8}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  const [formData, setFormData] = useState<ContactFormData>({
    solution: "namams",
    name: "",
    city: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = useCallback((): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("form.required");
    }

    if (!formData.city.trim()) {
      newErrors.city = t("form.required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("form.required");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Neteisingas el. pašto formatas";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("form.required");
    } else if (!lithuanianPhoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone =
        "Neteisingas telefono numeris (naudokite formatą +370XXXXXXXX arba 8XXXXXXXX)";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = t("form.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name as keyof ContactFormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const jsonData = await response.json();
      const data = jsonData as { success: boolean };

      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          solution: "namams",
          name: "",
          city: "",
          email: "",
          phone: "",
          comment: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-midnight text-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">{t("title")}</h1>
          <p className="text-xl text-sage text-center mt-4 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-offWhite">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-midnight mb-6">{t("form.title")}</h2>

                {submitStatus === "success" && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {t("form.success")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Įvyko klaida siunčiant žinutę. Bandykite dar kartą.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Solution Type */}
                  <div>
                    <label
                      htmlFor="solution"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("form.solution")} *
                    </label>
                    <select
                      id="solution"
                      name="solution"
                      value={formData.solution}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-sage rounded-lg focus:ring-2 focus:ring-peach focus:border-peach outline-none bg-white"
                    >
                      <option value="namams">{t("form.solutionHome")}</option>
                      <option value="verslui">{t("form.solutionBusiness")}</option>
                    </select>
                  </div>

                  {/* Name/Company */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach outline-none bg-white ${
                        errors.name ? "border-red-500" : "border-sage"
                      }`}
                      placeholder="Įveskite vardą arba įmonės pavadinimą"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.city")} *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach outline-none bg-white ${
                        errors.city ? "border-red-500" : "border-sage"
                      }`}
                      placeholder="Įveskite miestą"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach outline-none bg-white ${
                        errors.email ? "border-red-500" : "border-sage"
                      }`}
                      placeholder="email@pavyzdys.lt"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t("form.phone")} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach outline-none bg-white ${
                        errors.phone ? "border-red-500" : "border-sage"
                      }`}
                      placeholder="+370 6XX XXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  {/* Comment */}
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("form.comment")} *
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-peach outline-none bg-white resize-none ${
                        errors.comment ? "border-red-500" : "border-sage"
                      }`}
                      placeholder="Aprašykite savo poreikius..."
                    />
                    {errors.comment && (
                      <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-midnight text-sage-light py-4 rounded-lg font-semibold text-lg hover:bg-midnight-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Siunčiama..." : t("form.submit")}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-midnight text-sage-light rounded-2xl shadow-md p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">{t("info.title")}</h2>

                <div className="space-y-6">
                  {/* Phones */}
                  <div>
                    <h3 className="text-peach font-semibold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {t("info.phone")}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-lg">{tCommon("phone")}</p>
                      <p className="text-lg">{tCommon("phone2")}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-peach font-semibold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {t("info.email")}
                    </h3>
                    <p className="text-lg">{tCommon("email")}</p>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h3 className="text-peach font-semibold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {t("info.hours")}
                    </h3>
                    <p className="text-lg">{tCommon("workingHours")}</p>
                  </div>

                  {/* Service Area */}
                  <div>
                    <h3 className="text-peach font-semibold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {t("info.area")}
                    </h3>
                    <p className="text-lg">{tCommon("serviceArea")}</p>
                  </div>

                  {/* Company Code */}
                  <div className="pt-6 border-t border-sage-dark">
                    <p className="text-sage text-sm">{tCommon("companyCode")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

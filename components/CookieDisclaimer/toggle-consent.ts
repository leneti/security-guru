"use server";

import { cookies } from "next/headers";
import { Cookies } from "@site/constants/cookies";

export async function toggleCookieConsent() {
  const cookieStore = await cookies();
  const consent = cookieStore.get(Cookies.Consent)?.value === "1";
  if (consent) {
    for (const cookie of cookieStore.getAll()) {
      cookieStore.delete(cookie.name);
    }
  } else {
    cookieStore.set(Cookies.Consent, "1");
  }
}

export async function getCookieConsent() {
  const cookieStore = await cookies();
  return cookieStore.get(Cookies.Consent)?.value === "1";
}

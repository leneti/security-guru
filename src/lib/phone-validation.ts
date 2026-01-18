import { parsePhoneNumberWithError } from "libphonenumber-js";

/**
 * Checks if a phone number is a valid Lithuanian mobile number.
 * Lithuanian mobile numbers must start with "6" and be valid according to libphonenumber-js.
 *
 * @param phone - The phone number string to validate
 * @returns true if the phone number is a valid Lithuanian mobile number, false otherwise
 */
export function isValidLithuanianMobileNumber(phone: string): boolean {
  try {
    const phoneNumber = parsePhoneNumberWithError(phone, "LT");
    // Ensure it's valid and a mobile number (starts with 6)
    return phoneNumber.isValid() && phoneNumber.nationalNumber.startsWith("6");
  } catch {
    return false;
  }
}

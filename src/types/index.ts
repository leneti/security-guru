/**
 * TypeScript types for Security Guru website
 */

import type { Service } from "@/payload-types";

// Contact Form Types
export type SolutionType = "namams" | "verslui";

export interface ContactFormData {
  solution: SolutionType;
  name: string;
  city: string;
  email: string;
  phone: string;
  comment: string;
}

export interface ContactFormErrors {
  solution?: string;
  name?: string;
  city?: string;
  email?: string;
  phone?: string;
  comment?: string;
}

// API Response Types - Re-export from payload types for consistency
export type { Service } from "@/payload-types";

/**
 * Lightweight Service type for frontend use (without payload metadata)
 * Use this when you don't need the full payload type with createdAt/updatedAt
 */
export type FrontendService = Pick<
  Service,
  "id" | "title" | "description" | "price" | "icon" | "image"
>;

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

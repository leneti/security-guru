/**
 * TypeScript types for Security Guru website
 */

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

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

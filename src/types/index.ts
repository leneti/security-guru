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

// Product Types (for e-shop inventory)
export interface WarehouseData {
  name: string;
  quantity: number;
}

export interface ProductItem {
  name: string;
  price: string; // Format: "11,99 €"
  href: string; // Remote image URL
  warehouseData: WarehouseData[];
}

export interface ProductCategory {
  categoryUrl: string; // Can be ignored for debugging
  productItems: ProductItem[];
  requestsInCategory: number;
}

export interface Product {
  id: string; // Generated from href or name
  name: string;
  category: string;
  price: number; // Parsed from price string
  image: string; // From href
  inStock: boolean; // Calculated from total quantity > 0
  totalQuantity: number; // Sum of all warehouse quantities
  displayQuantity: string; // "10+" if >= 10, else actual number
  sku?: string; // Not available in real format
  description?: string; // Not available in real format
}

export interface InventoryMeta {
  lastUpdated: string;
  version: string;
}

export interface InventoryData {
  products: Product[];
  categories: ProductCategory[];
  meta: InventoryMeta;
}

// Type for the raw inventory format from the supplier
export type RawInventoryData = ProductCategory[];

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

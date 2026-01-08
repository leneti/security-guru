/**
 * Inventory loading utilities for the e-shop
 */

import type { Product, ProductCategory, InventoryData } from "@/types";

// Cache for inventory data to avoid repeated file reads
let inventoryCache: InventoryData | null = null;

/**
 * Load inventory data from the JSON file
 * Uses cached data if available
 */
export async function loadInventory(): Promise<InventoryData> {
  if (inventoryCache) {
    return inventoryCache;
  }

  try {
    const response = await fetch("/data/inventory.json");
    if (!response.ok) {
      throw new Error(`Failed to load inventory: ${response.statusText}`);
    }

    const data = (await response.json()) as InventoryData;
    inventoryCache = data;
    return data;
  } catch (error) {
    console.error("Error loading inventory:", error);
    // Return empty inventory on error
    return {
      products: [],
      categories: [],
      meta: {
        lastUpdated: new Date().toISOString(),
        version: "1.0.0",
      },
    };
  }
}

/**
 * Get all products from inventory
 */
export async function getProducts(): Promise<Product[]> {
  const inventory = await loadInventory();
  return inventory.products;
}

/**
 * Get all categories from inventory
 */
export async function getCategories(): Promise<ProductCategory[]> {
  const inventory = await loadInventory();
  return inventory.categories;
}

/**
 * Get a product by its ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === id) || null;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );
}

/**
 * Get products by multiple category names
 */
export async function getProductsByCategories(categoryNames: string[]): Promise<Product[]> {
  const products = await getProducts();
  const lowerCategories = categoryNames.map((c) => c.toLowerCase());
  return products.filter((product) => lowerCategories.includes(product.category.toLowerCase()));
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowerQuery = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get products that are in stock
 */
export async function getInStockProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.inStock);
}

/**
 * Get unique categories from all products
 */
export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}

/**
 * Format price to Lithuanian format
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

/**
 * Clear the inventory cache (useful for development/testing)
 */
export function clearInventoryCache(): void {
  inventoryCache = null;
}

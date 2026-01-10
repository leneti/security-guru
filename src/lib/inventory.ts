/**
 * Inventory loading utilities for the e-shop
 */

import type { Product, ProductCategory, InventoryData, RawInventoryData, ProductItem } from "@/types";

// Cache for inventory data to avoid repeated file reads
let inventoryCache: InventoryData | null = null;

/**
 * Parse price string to number (e.g., "11,99 €" -> 11.99)
 */
function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/[^\d,]/g, '').replace(',', '.'));
}

/**
 * Calculate total quantity across all warehouses
 */
function calculateTotalQuantity(warehouseData: { name: string; quantity: number }[]): number {
  return warehouseData.reduce((total, warehouse) => total + warehouse.quantity, 0);
}

/**
 * Generate display quantity string (10+ if >= 10, else actual number)
 */
function getDisplayQuantity(totalQuantity: number): string {
  return totalQuantity >= 10 ? "10+" : totalQuantity.toString();
}

/**
 * Generate a unique ID for a product (fallback to hash of name if href not available)
 */
function generateProductId(productItem: ProductItem, categoryIndex: number, productIndex: number): string {
  // Use href as base for ID, or hash of name as fallback
  const base = productItem.href || productItem.name;
  return `prod-${categoryIndex}-${productIndex}-${base.slice(-10).replace(/[^a-zA-Z0-9]/g, '')}`;
}

/**
 * Extract category name from category URL
 */
function extractCategoryName(categoryUrl: string): string {
  // Extract from URL like "https://bkgrupe.lt/lt/ip-vaizdo-apsauga.html"
  const urlParts = categoryUrl.split('/');
  const categorySlug = urlParts[urlParts.length - 1].replace('.html', '');
  // Convert slug to readable name (basic implementation)
  return categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Transform raw inventory data to our internal format
 */
function transformRawInventory(rawData: RawInventoryData): InventoryData {
  const products: Product[] = [];
  const categories: ProductCategory[] = [];

  rawData.forEach((category, categoryIndex) => {
    const categoryName = extractCategoryName(category.categoryUrl);
    categories.push(category); // Keep original category structure

    category.productItems.forEach((productItem, productIndex) => {
      const totalQuantity = calculateTotalQuantity(productItem.warehouseData);
      const product: Product = {
        id: generateProductId(productItem, categoryIndex, productIndex),
        name: productItem.name,
        category: categoryName,
        price: parsePrice(productItem.price),
        image: productItem.href, // Use href as image source
        inStock: totalQuantity > 0,
        totalQuantity,
        displayQuantity: getDisplayQuantity(totalQuantity),
      };

      products.push(product);
    });
  });

  return {
    products,
    categories,
    meta: {
      lastUpdated: new Date().toISOString(),
      version: "2.0.0",
    },
  };
}

/**
 * Load inventory data from the JSON file
 * Uses cached data if available
 */
export async function loadInventory(): Promise<InventoryData> {
  if (inventoryCache) {
    return inventoryCache;
  }

  try {
    const response = await fetch("/data/real-inventory-example.json");
    if (!response.ok) {
      throw new Error(`Failed to load inventory: ${response.statusText}`);
    }

    const rawData = (await response.json()) as RawInventoryData;
    const data = transformRawInventory(rawData);
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
        version: "2.0.0",
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
      (product.description && product.description.toLowerCase().includes(lowerQuery)) ||
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

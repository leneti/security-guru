/**
 * Inventory loading utilities for the e-shop
 */

import type {
  Product,
  ProductCategory,
  InventoryData,
  RawInventoryData,
  ProductItem,
} from "@/types";

// Cache for inventory data to avoid repeated file reads
let inventoryCache: InventoryData | null = null;

/**
 * Parse price string to number (e.g., "11,99 €" -> 11.99)
 */
function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/[^\d,]/g, "").replace(",", "."));
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
function generateProductId(
  productItem: ProductItem,
  categoryIndex: number,
  productIndex: number,
): string {
  // Use href as base for ID, or hash of name as fallback
  const base = productItem.href || productItem.name;
  return `prod-${categoryIndex}-${productIndex}-${base.slice(-10).replace(/[^a-zA-Z0-9]/g, "")}`;
}

/**
 * Extract category name from category URL
 */
function extractCategoryName(categoryUrl: string): string {
  // Extract from URL like "https://bkgrupe.lt/lt/ip-vaizdo-apsauga.html"
  const urlParts = categoryUrl.split("/");
  const categorySlug = urlParts[urlParts.length - 1].replace(".html", "");
  // Convert slug to readable name (basic implementation)
  return categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
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
 * Load inventory data - returns dummy data for development
 * Uses cached data if available
 */
export async function loadInventory(): Promise<InventoryData> {
  if (inventoryCache) {
    return inventoryCache;
  }

  try {
    // Return dummy data instead of fetching from file
    const dummyRawData: RawInventoryData = [
      {
        categoryUrl: "https://example.com/vaizdo-stebejimas",
        productItems: [
          {
            name: "Hikvision IP kamera DS-2CD2387G2-LISU/SL (8MP, 30m IR)",
            price: "299,99 €",
            href: "https://example.com/camera1",
            warehouseData: [
              { name: "Vilnius", quantity: 15 },
              { name: "Kaunas", quantity: 8 },
              { name: "Klaipėda", quantity: 12 },
            ],
          },
          {
            name: "Dahua IP kamera IPC-HDW5442TM-AS-LED (4MP, 50m IR)",
            price: "189,50 €",
            href: "https://example.com/camera2",
            warehouseData: [
              { name: "Vilnius", quantity: 22 },
              { name: "Kaunas", quantity: 6 },
              { name: "Klaipėda", quantity: 9 },
            ],
          },
          {
            name: "EZVIZ C6N 1080p WiFi kamera su judesio aptikimu",
            price: "89,99 €",
            href: "https://example.com/camera3",
            warehouseData: [
              { name: "Vilnius", quantity: 35 },
              { name: "Kaunas", quantity: 18 },
              { name: "Klaipėda", quantity: 7 },
            ],
          },
        ],
        requestsInCategory: 45,
      },
      {
        categoryUrl: "https://example.com/signalizacija",
        productItems: [
          {
            name: "Ajax StarterKit signalizacijos sistema (4 jutikliai)",
            price: "199,00 €",
            href: "https://example.com/alarm1",
            warehouseData: [
              { name: "Vilnius", quantity: 8 },
              { name: "Kaunas", quantity: 12 },
              { name: "Klaipėda", quantity: 5 },
            ],
          },
          {
            name: "Hikvision AX PRO signalizacijos centras",
            price: "149,99 €",
            href: "https://example.com/alarm2",
            warehouseData: [
              { name: "Vilnius", quantity: 18 },
              { name: "Kaunas", quantity: 9 },
              { name: "Klaipėda", quantity: 14 },
            ],
          },
          {
            name: "Judėjimo jutiklis PIR su šviesos indikatoriumi",
            price: "24,50 €",
            href: "https://example.com/sensor1",
            warehouseData: [
              { name: "Vilnius", quantity: 45 },
              { name: "Kaunas", quantity: 28 },
              { name: "Klaipėda", quantity: 31 },
            ],
          },
        ],
        requestsInCategory: 28,
      },
      {
        categoryUrl: "https://example.com/ieigos-kontrolė",
        productItems: [
          {
            name: "ZKTeco SF100 biometrinis piršto atspaudų skaitytuvas",
            price: "179,00 €",
            href: "https://example.com/fingerprint",
            warehouseData: [
              { name: "Vilnius", quantity: 6 },
              { name: "Kaunas", quantity: 4 },
              { name: "Klaipėda", quantity: 8 },
            ],
          },
          {
            name: "RFID kortelių skaitytuvas su relės išėjimu",
            price: "39,99 €",
            href: "https://example.com/rfid-reader",
            warehouseData: [
              { name: "Vilnius", quantity: 25 },
              { name: "Kaunas", quantity: 16 },
              { name: "Klaipėda", quantity: 19 },
            ],
          },
          {
            name: "Elektroninė spyna su PIN kodu ir kortelių skaitymu",
            price: "129,50 €",
            href: "https://example.com/smart-lock",
            warehouseData: [
              { name: "Vilnius", quantity: 12 },
              { name: "Kaunas", quantity: 7 },
              { name: "Klaipėda", quantity: 10 },
            ],
          },
        ],
        requestsInCategory: 32,
      },
    ];

    const data = transformRawInventory(dummyRawData);
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
    (product) => product.category.toLowerCase() === categoryName.toLowerCase(),
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
      product.category.toLowerCase().includes(lowerQuery),
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

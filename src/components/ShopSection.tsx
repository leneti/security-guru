"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts, getProductCategories } from "@/lib/inventory";
import type { Product } from "@/types";
import { CartSidebar } from "./CartSidebar";

export function ShopSection() {
  const [filter, setFilter] = useState("Visos prekės");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default to larger screens

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getProductCategories(),
        ]);
        setProducts(productsData);
        setCategories(["Visos prekės", ...categoriesData]);
      } catch (error) {
        console.error("Failed to load shop data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 6 : 8);
    };

    updateItemsPerPage(); // Set initial value
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredProducts =
    filter === "Visos prekės"
      ? products
      : products.filter((product) => product.category === filter);

  // Reset to first page when filter or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, itemsPerPage]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      if (currentPage <= 3) {
        // Near the start
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "Vaizdo stebėjimas":
        return "Kameros";
      case "Apsaugos sistemos":
        return "Jutikliai";
      case "Įeigos kontrolė":
        return "Kontrolė";
      case "Priešgaisrinės sistemos":
        return "Jutikliai";
      default:
        return "Priedai";
    }
  };

  if (loading) {
    return (
      <section id="shop" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Kraunama...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="shop" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-dark">E-Parduotuvė</h2>
              <p className="text-gray-500 mt-2">Įsigykite saugumo įrangą internetu</p>
            </div>

            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto no-scrollbar w-full md:w-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    filter === category
                      ? "bg-dark text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 bg-primary text-dark p-2 rounded-full shadow-lg aspect-square flex items-center justify-center transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-mauve font-bold uppercase">
                    {getCategoryName(product.category)}
                  </span>
                  <h3 className="font-bold text-dark text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-dark">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-dark hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>

              {/* Page Numbers */}
              <div className="flex space-x-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    disabled={page === "..."}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-dark text-white"
                        : page === "..."
                          ? "bg-transparent text-gray-400 cursor-default"
                          : "bg-white text-dark hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-dark hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}

          {/* Results Info */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-6 text-sm text-gray-500">
              Rodoma {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} iš{" "}
              {filteredProducts.length} prekių
            </div>
          )}
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </>
  );
}

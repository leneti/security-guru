"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { useCart } from "@/lib/cart-context";
import { getProducts, getProductCategories } from "@/lib/inventory";
import type { Product } from "@/types";

import { CartSidebar } from "./CartSidebar";

export function ShopSection() {
  const [filter, setFilter] = useState("Visos prekės");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default to larger screens
  const { cart, isCartOpen, closeCart, addToCart, removeFromCart } = useCart();

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
      <section id="shop" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">Kraunama...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="shop" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-dark">E-Parduotuvė</h2>
              <p className="mt-2 text-gray-500">Įsigykite saugumo įrangą internetu</p>
            </div>

            <div className="no-scrollbar mt-6 flex w-full gap-2 overflow-x-auto pb-2 md:mt-0 md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
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

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-gray-100 bg-white p-4 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute right-2 bottom-2 flex aspect-square translate-y-10 transform items-center justify-center rounded-full bg-primary p-2 text-dark opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-mauve uppercase">
                    {getCategoryName(product.category)}
                  </span>
                  <h3 className="mb-2 line-clamp-2 min-h-[40px] text-sm font-bold text-dark">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-dark">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "border border-gray-200 bg-white text-dark hover:bg-gray-50"
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
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-dark text-white"
                        : page === "..."
                          ? "cursor-default bg-transparent text-gray-400"
                          : "border border-gray-200 bg-white text-dark hover:bg-gray-50"
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
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "border border-gray-200 bg-white text-dark hover:bg-gray-50"
                }`}
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}

          {/* Results Info */}
          {filteredProducts.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              Rodoma {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} iš{" "}
              {filteredProducts.length} prekių
            </div>
          )}
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </>
  );
}

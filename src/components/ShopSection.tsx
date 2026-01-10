"use client";

import { useState, useEffect } from "react";
import { getProducts, getProductCategories } from "@/lib/inventory";
import type { Product } from "@/types";
import CartSidebar from "./CartSidebar";

export default function ShopSection() {
  const [filter, setFilter] = useState("Visos prekės");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getProductCategories()
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

  const filteredProducts = filter === "Visos prekės"
    ? products
    : products.filter(product => product.category === filter);

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case "Vaizdo stebėjimas": return "Kameros";
      case "Apsaugos sistemos": return "Jutikliai";
      case "Įeigos kontrolė": return "Kontrolė";
      case "Priešgaisrinės sistemos": return "Jutikliai";
      default: return "Priedai";
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 bg-primary text-dark p-2 rounded-full shadow-lg transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
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
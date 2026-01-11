"use client";

import Image from "next/image";
import type { Product } from "@/types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  removeFromCart: (index: number) => void;
}

export default function CartSidebar({ isOpen, onClose, cart, removeFromCart }: CartSidebarProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="font-bold text-xl text-dark">Krepšelis ({cart.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <span className="material-symbols-outlined text-4xl mb-2">
                production_quantity_limits
              </span>
              <p>Jūsų krepšelis tuščias</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-dark line-clamp-2">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">{item.price.toFixed(2)} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between mb-4 text-dark font-bold text-lg">
            <span>Viso:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <button
            disabled={cart.length === 0}
            className={`w-full bg-primary text-dark font-bold py-3 rounded-lg hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Apmokėti
          </button>
        </div>
      </div>
    </>
  );
}

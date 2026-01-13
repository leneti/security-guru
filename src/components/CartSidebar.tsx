"use client";

import Image from "next/image";

import type { Product } from "@/types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  removeFromCart: (index: number) => void;
}

export function CartSidebar({ isOpen, onClose, cart, removeFromCart }: CartSidebarProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          className="fixed inset-0 z-40 cursor-pointer border-0 bg-black/50 p-0"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
          aria-label="Uždaryti krepšelį"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 sm:w-96 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-50 p-6">
          <h2 className="text-xl font-bold text-dark">Krepšelis ({cart.length})</h2>
          <button
            onClick={onClose}
            className="flex aspect-square cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="mt-10 text-center text-gray-500">
              <span className="material-symbols-outlined mb-2 text-4xl">
                production_quantity_limits
              </span>
              <p>Jūsų krepšelis tuščias</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-4 rounded-lg bg-gray-50 p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-dark">{item.name}</h3>
                  <p className="mt-1 font-bold text-primary">{item.price.toFixed(2)} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 transition-colors hover:text-red-700"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-6">
          <div className="mb-4 flex justify-between text-lg font-bold text-dark">
            <span>Viso:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <button
            disabled={cart.length === 0}
            className={`w-full rounded-lg bg-primary py-3 font-bold text-dark transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Apmokėti
          </button>
        </div>
      </div>
    </>
  );
}

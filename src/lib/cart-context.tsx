"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/types";

interface CartContextType {
  cart: Product[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCartItemCount = () => {
    return cart.length;
  };

  const value: CartContextType = {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    openCart,
    closeCart,
    toggleCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

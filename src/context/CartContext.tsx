"use client";
import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { CartItem, Product } from '@/lib/types';
import { getCartItemKey } from '@/lib/utils';

interface AddToCartOptions {
  product: Product;
  quantity?: number;
  variant1?: string;
  variant2?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (options: AddToCartOptions) => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isInitialized = useRef(true);

  useEffect(() => {
    if (isInitialized.current) {
      isInitialized.current = false;
      return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = ({ product, quantity = 1, variant1, variant2 }: AddToCartOptions) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => 
        item.id === product.id && 
        item.selectedVariant1 === variant1 && 
        item.selectedVariant2 === variant2
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prev, { 
        ...product, 
        quantity, 
        selectedVariant1: variant1, 
        selectedVariant2: variant2 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueId: string) => {
    setCart((prev) => prev.filter((item) => getCartItemKey(item) !== uniqueId));
  };

  const updateQuantity = (uniqueId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (getCartItemKey(item) === uniqueId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  async function refreshCart() {
    try {
      const response = await fetch("/api/carts");
      if (!response.ok) return;
      const cart = await response.json();
      const count =
        cart.items?.reduce(
          (total: number, item: any) => total + item.quantity,
          0
        ) || 0;
      setCartCount(count);
    } catch {}
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
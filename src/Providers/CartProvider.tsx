"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./SupabaseProvider";
import supabase from "@/supabase/client";
import { Product } from "@/types/types";

type CartContextType = {
  cart: Product[];
  addToCart: (item: Product) => Promise<{ success: boolean; error?: any }>;
  fetchCart: () => Promise<{ success: boolean; data?: Product[]; error?: any }>;
  removeFromCart: (itemID: string) => Promise<{ success: boolean; error?: any }>;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => ({ success: false, error: null }),
  fetchCart: async () => ({ success: false, error: null }),
  removeFromCart: async () => ({ success: false, error: null }),
  isInCart: () => false,
});

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [session]);

  const addToCart = async (item: Product) => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    if (isInCart(item.id)) {
      return { success: false, error: "Item already in cart" };
    }

    setCart((prevCart) => [...prevCart, item]);

    try {
      const { error } = await supabase.from("cart_items").insert({
        user_id: session.user.id,
        product_id: item.id,
      
      });

      if (error) {
        setCart((prevCart) => prevCart.filter((p) => p.id !== item.id));
        console.error("Error adding to cart:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      setCart((prevCart) => prevCart.filter((p) => p.id !== item.id));
      console.error("Unexpected error adding to cart:", err);
      return { success: false, error: (err as Error).message };
    }
  };

  const fetchCart = async () => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("products(*)")  
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching cart:", error);
        return { success: false, error };
      }

      const formattedData = data.map((item: any) => item.products);
      setCart(formattedData);
      return { success: true, data: formattedData };
    } catch (err) {
      console.error("Unexpected error fetching cart:", err);
      return { success: false, error: err };
    }
  };

  const removeFromCart = async (itemID: string) => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    setCart((prevCart) => prevCart.filter((p) => p.id !== itemID));

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", itemID);

      if (error) {
        console.error("Error removing from cart:", error);
        return { success: false, error };
      }

      return { success: true };
    } catch (err) {
      console.error("Unexpected error removing from cart:", err);
      return { success: false, error: err };
    }
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    fetchCart,
    removeFromCart,
    isInCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./SupabaseProvider";
import supabase from "@/supabase/client";
import { CartItem, Product } from "@/types/types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<{ success: boolean; error?: string }>;
  fetchCart: () => Promise<{ success: boolean; data?: CartItem[]; error?: string }>;
  removeFromCart: (itemID: string) => Promise<{ success: boolean; error?: string }>;
  isInCart: (productId: string) => boolean;
  clearCart: () => Promise<{ success: boolean; error?: string }>;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => ({ success: false, error: undefined }),
  fetchCart: async () => ({ success: false, error: undefined }),
  removeFromCart: async () => ({ success: false, error: undefined }),
  isInCart: () => false,
  clearCart: async () => ({ success: false, error: undefined }),
});

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Wrap fetchCart in useCallback to provide a stable reference.
  const fetchCart = useCallback(async (): Promise<{ success: boolean; data?: CartItem[]; error?: string }> => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*, product:products(*), variant:product_variants(*)")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching cart:", error);
        return { success: false, error: error.message };
      }

      // Define the expected shape of a row returned from Supabase.
      type SupabaseCartItem = {
        user_id: string;
        product: Product;
        product_variant_id: string;
        selectedColor: string;
        selectedSize: string;
        quantity: number;
        variant: unknown;
      };

      const formattedData: CartItem[] = (data as SupabaseCartItem[]).map((item) => ({
        user_id: item.user_id,
        product: item.product,
        variant_id: item.product_variant_id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }));

      setCart(formattedData);
      return { success: true, data: formattedData };
    } catch (err) {
      console.error("Unexpected error fetching cart:", err);
      return { success: false, error: (err as Error).message };
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [session, fetchCart]);

  const addToCart = async (item: CartItem): Promise<{ success: boolean; error?: string }> => {
    if (!session?.user?.id) {
      alert("Sign in first");
      return { success: false, error: "User is not logged in." };
    }

    if (isInCart(item.product.id)) {
      return { success: false, error: "Item already in cart" };
    }

    // Optimistically update the UI.
    setCart((prevCart) => [...prevCart, item]);

    try {
      const { error } = await supabase.from("cart_items").insert({
        user_id: session.user.id,
        product_id: item.product.id,
        variant_id: item.variant_id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      });

      if (error) {
        // Rollback the UI update if there is an error.
        setCart((prevCart) => prevCart.filter((p) => p.product.id !== item.product.id));
        console.error("Error adding to cart:", error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      setCart((prevCart) => prevCart.filter((p) => p.product.id !== item.product.id));
      console.error("Unexpected error adding to cart:", err);
      return { success: false, error: (err as Error).message };
    }
  };

  const clearCart = async (): Promise<{ success: boolean; error?: string }> => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error clearing cart:", error);
        return { success: false, error: error.message };
      }

      setCart([]);
      return { success: true };
    } catch (err) {
      console.error("Unexpected error clearing cart:", err);
      return { success: false, error: (err as Error).message };
    }
  };

  const removeFromCart = async (itemID: string): Promise<{ success: boolean; error?: string }> => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    setCart((prevCart) => prevCart.filter((p) => p.product.id !== itemID));

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", itemID);

      if (error) {
        console.error("Error removing from cart:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      console.error("Unexpected error removing from cart:", err);
      return { success: false, error: (err as Error).message };
    }
  };

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.product.id === productId);
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    fetchCart,
    removeFromCart,
    isInCart,
    clearCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

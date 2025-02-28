"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./SupabaseProvider";
import supabase from "@/supabase/client";
import { CartItem, Product } from "@/types/types";
import { useRouter } from "next/navigation";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<{ success: boolean; error?: any }>;
  fetchCart: () => Promise<{ success: boolean; data?: CartItem[]; error?: any }>;
  removeFromCart: (itemID: string) => Promise<{ success: boolean; error?: any }>;
  isInCart: (productId: string) => boolean;
  clearCart: ()=>Promise<{success: boolean; error?: any}>
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => ({ success: false, error: null }),
  fetchCart: async () => ({ success: false, error: null }),
  removeFromCart: async () => ({ success: false, error: null }),
  isInCart: () => false,
  clearCart: async () => ({ success: false, error: null }),
});

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [session]);

  const addToCart = async (item: CartItem) => {
    if (!session?.user?.id) {
      alert('sign in first');
      return { success: false, error: "User is not logged in." };
    }

    if (isInCart(item.product.id)) {
      return { success: false, error: "Item already in cart" };
    }

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




      console.log("ffffffffffff")

      if (error) {
        setCart((prevCart) => prevCart.filter((p) => p.product.id !== item.product.id));
        console.error("Error adding to cart:", error);
        return { success: false, error: error.message };
      }
      console.log('cartowwwwwww: ', cart)
      return { success: true };
    } catch (err) {
      setCart((prevCart) => prevCart.filter((p) => p.product.id !== item.product.id));
      console.error("Unexpected error adding to cart:", err);
      return { success: false, error: (err as Error).message };
    }
  };

  
  const clearCart = async () => {
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
        return { success: false, error };
      }
  
      setCart([]); // Clear the local cart state after successful deletion
      return { success: true };
    } catch (err) {
      console.error("Unexpected error clearing cart:", err);
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
        .select("*, product:products(*), variant:product_variants(*)")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching cart:", error);
        return { success: false, error };
      }

      const formattedData: CartItem[] = data.map((item: any) => ({
        user_id: item.user_id,
        product: item.product as Product,
        variant_id: item.product_variant_id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      }));

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

    setCart((prevCart) => prevCart.filter((p) => p.product.id !== itemID));

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

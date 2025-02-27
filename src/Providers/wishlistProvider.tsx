"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./SupabaseProvider";
import supabase from "@/supabase/client";
import { Product } from "@/types/types";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (item: Product) => Promise<{ success: boolean; error?: any }>;
  fetchWishlist: () => Promise<{ success: boolean; data?: any; error?: any }>;
  removeFromWishlist: (productId: string) => Promise<{ success: boolean; error?: any }>;
  isProductLiked: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: async () => ({ success: false, error: null }),
  fetchWishlist: async () => ({ success: false, error: null }),
  removeFromWishlist: async () => ({ success: false, error: null }),
  isProductLiked: () => false,
});

export const WishlistContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchWishlist();
    }
  }, [session]);

  const addToWishlist = async (item: Product) => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    // Optimistically add item
    setWishlist((prev) => [...prev, item]);

    try {
      const { error } = await supabase.from("wishlist_items").insert({
        user_id: session.user.id,
        product_id: item.id,
      });

      if (error) {
        setWishlist((prev) => prev.filter((p) => p.id !== item.id)); // Rollback
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      setWishlist((prev) => prev.filter((p) => p.id !== item.id));
      return { success: false, error: (err as Error).message };
    }
  };

  const fetchWishlist = async () => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("products(*)")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching wishlist:", error);
        return { success: false, error };
      }

      const formattedData = data.map((item: any) => item.products);
      setWishlist(formattedData);
      return { success: true, data: formattedData };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { success: false, error: err };
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    setWishlist((prev) => prev.filter((p) => p.id !== productId));

    try {
      const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", productId);

      if (error) {
        console.error("Error removing from wishlist:", error);
        return { success: false, error };
      }

      return { success: true };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { success: false, error: err };
    }
  };

  // Check if a specific product is liked
  const isProductLiked = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const contextValue: WishlistContextType = {
    wishlist,
    addToWishlist,
    fetchWishlist,
    removeFromWishlist,
    isProductLiked,
  };

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);

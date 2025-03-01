"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./SupabaseProvider";
import supabase from "@/supabase/client";
import { Product } from "@/types/types";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (item: Product) => Promise<{ success: boolean; error?: unknown }>;
  fetchWishlist: () => Promise<{ success: boolean; data?: Product[]; error?: unknown }>;
  removeFromWishlist: (productId: string) => Promise<{ success: boolean; error?: unknown }>;
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

  // Memoize fetchWishlist with useCallback
  const fetchWishlist = useCallback(async () => {
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

      
      const formattedData = (data as Array<{ products: Product[] }>).flatMap(item => item.products);


      setWishlist(formattedData);
      return { success: true, data: formattedData };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { success: false, error: err };
    }
  }, [session?.user?.id]);

  // Add fetchWishlist to the dependency array
  useEffect(() => {
    if (session?.user?.id) {
      fetchWishlist();
    }
  }, [session, fetchWishlist]);

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
        // Rollback on error
        setWishlist((prev) => prev.filter((p) => p.id !== item.id));
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      // Rollback on unexpected error
      setWishlist((prev) => prev.filter((p) => p.id !== item.id));
      return { success: false, error: (err as Error).message };
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!session?.user?.id) {
      return { success: false, error: "User is not logged in." };
    }

    // Optimistically update wishlist
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

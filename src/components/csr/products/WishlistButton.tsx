"use client";
import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useWishlist } from "@/Providers/wishlistProvider";
import { Product } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/SupabaseProvider";
import { useRouter } from "next/navigation";

interface WishlistButtonProps {
  product: Product;
}

const WishlistButton = ({ product }: WishlistButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToWishlist, removeFromWishlist, isProductLiked } = useWishlist();
  const { session } = useAuth();
  const router = useRouter();
  const isLiked = isProductLiked(product.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session?.user?.id) {
      alert("you are not logged");
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
      return { success: false, error: "User is not logged in." };
    }

    try {
      if (isLiked) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"icon"}
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-all duration-200 hover:scale-110 hover:bg-gray-50 disabled:opacity-50"
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart
          className={`w-4 h-4 transition-colors ${
            isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      )}
    </Button>
  );
};

export default WishlistButton;

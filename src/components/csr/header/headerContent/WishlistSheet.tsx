"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Providers/SupabaseProvider";
import { useWishlist } from "@/Providers/wishlistProvider";

const WishlistSheet = () => {
  const { session } = useAuth();
  const { wishlist, fetchWishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | unknown>(null);

  useEffect(() => {
    const loadWishlist = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      const { error } = await fetchWishlist();
      setLoading(false);
      if (error) {
        setError(error || "Failed to load wishlist.");
      }
    };

    loadWishlist();
  }, [session, fetchWishlist]);

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  return (
    <Sheet>
      <SheetTrigger className="p-2 hover:bg-gray-100 rounded-full relative">
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <SheetTitle>Your Wishlist ({wishlist.length})</SheetTitle>
          <SheetDescription>
            View and manage your wishlist items.
          </SheetDescription>
        </SheetHeader>

        {!session ? (
          <p className="text-gray-800 font-semibold text-center mt-11">You are not logged</p>
        ) : loading ? (
          <div className="flex items-center justify-center py-8">
            <p>Loading wishlist...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-red-500">
            <p>Error loading wishlist</p>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Heart className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-sm text-gray-500">
              Save items you love to your wishlist
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {wishlist.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex gap-4 p-4 items-center">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={false}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col">
                        <Link href={`/products/${product.id}`} passHref>
                          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.category}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 items-center">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200 transition"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <p className="font-semibold text-sm text-gray-800">
                        ${product.base_price}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full">
              <Link href="/wishlist">View Full Wishlist</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default WishlistSheet;

"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";


const FeaturedProductsSection = () => {
  
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  
 
  
  const toggleWishlist = (productId: string) => {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId));
    } else {
      setWishlistItems([...wishlistItems, productId]);
    }
  };

  const featuredProducts = [
    {
      id: "1",
      name: "Premium Cotton Hoodie",
      category: "Outerwear",
      price: 59.99,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=400&width=300",
      badge: "New Arrival",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      category: "Bottoms",
      price: 49.99,
      rating: 4.6,
      reviews: 98,
      image: "/placeholder.svg?height=400&width=300",
      badge: "Bestseller",
    },
  ];
  
 

  return (
    <section className="py-12 bg-white min-w-6xl">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden border rounded-lg"
            >
              <div className="aspect-[2/1.7] relative overflow-hidden bg-gray-100">
                <Image
                  src="/img/test1.jpg"
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10">
                    {product.badge}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm ${
                    wishlistItems.includes(product.id)
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      wishlistItems.includes(product.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {product.category}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button >Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
     

    </section>
  );
};

export default FeaturedProductsSection;
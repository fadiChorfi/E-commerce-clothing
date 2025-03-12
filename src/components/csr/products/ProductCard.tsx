import React from "react";
import { Product } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import WishlistButton from "./WishlistButton";
import { Star } from "lucide-react";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1   overflow-hidden rounded-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <WishlistButton product={product} />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.category}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(3)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">${product.base_price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

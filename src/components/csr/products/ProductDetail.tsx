"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types/types";
import Header from "../header/Header";
import { useCart } from "@/Providers/CartProvider";
import WishlistButton from "./WishlistButton";
import {
  MinusCircle,
  PlusCircle,
  ShoppingCart,
  CreditCard,
  Package,
} from "lucide-react";
import { useOrder } from "@/Providers/orderProvider";
import { useBuy } from "@/Providers/checkoutProvider";

type Props = {
  product: Product;
};

const ProductDetail = ({ product }: Props) => {
  const [counter, setCounter] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const router = useRouter();
  const { addToCart } = useCart();
  const { setBuyItem } = useBuy();

  const { createOrder } = useOrder();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddQuantity = () => {
    setCounter(counter + 1);
  };

  const handleMinQuantity = () => {
    if (counter == 0) {
      return;
    }
    setCounter(counter - 1);
  };

  const handlebuyBtn = () => {
   /*  setBuyItem({
      productId: product.id,
      quantity: counter,
      selectedColor,
      selectedSize,
    }); */

    router.push("/protected/checkOut");
  };

  const variants: ProductVariant[] = product.product_variants || [];
  const colors = [...new Set(variants.map((variant) => variant.color))];
  const sizes = [...new Set(variants.map((variant) => variant.size))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="md:hidden bg-white border-b px-4 py-2">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 flex items-center"
        >
          &larr; Back to products
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4 sm:space-y-6 order-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-2 max-w-lg mx-auto">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="hidden sm:block bg-gray-50 rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-3">
                Product Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Premium Quality Materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    Free Shipping on Orders Over $50
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">30-Day Return Policy</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative space-y-6 sm:space-y-8 order-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    SKU: {product.id}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-4 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="p-1 flex-shrink-0">
                <WishlistButton product={product} />
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                ${product.base_price}
              </p>
              {product.base_price && (
                <p className="ml-3 text-base sm:text-lg text-gray-500 line-through">
                  ${product.base_price}
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 py-1 sm:py-2"></div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Color</h3>
                {selectedColor && (
                  <span className="text-xs sm:text-sm text-gray-500">
                    Selected: {selectedColor}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {colors.length > 0 ? (
                  colors.map((color, index) => (
                    <button
                      key={index}
                      className={`
                        px-3 py-1.5 sm:px-5 sm:py-2.5 text-sm rounded-lg transition-all duration-200
                        ${
                          selectedColor === color
                            ? "bg-blue-700 text-white shadow-md border-transparent"
                            : "border border-gray-300 hover:border-blue-500 hover:bg-gray-50"
                        }
                      `}
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                    >
                      {color}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No colors available
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Size</h3>
                {selectedSize && (
                  <span className="text-xs sm:text-sm text-gray-500">
                    Selected: {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {sizes.length > 0 ? (
                  sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`
                        w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg text-sm transition-all duration-200
                        ${
                          selectedSize === size
                            ? "bg-blue-700 text-white shadow-md border-transparent"
                            : "border border-gray-300 hover:border-blue-500 hover:bg-gray-50"
                        }
                      `}
                      onClick={() => {
                        setSelectedSize(size);
                      }}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No sizes available
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-medium text-gray-800">Quantity</h3>
              <div className="flex items-center bg-gray-100 w-max rounded-lg overflow-hidden">
                <button
                  onClick={handleMinQuantity}
                  className="p-2 sm:p-3 text-gray-600 hover:bg-gray-200 transition"
                >
                  <MinusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <span className="w-10 sm:w-12 text-center text-lg sm:text-xl font-medium">
                  {counter}
                </span>
                <button
                  onClick={handleAddQuantity}
                  className="p-2 sm:p-3 text-gray-600 hover:bg-gray-200 transition"
                >
                  <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 py-1 sm:py-2"></div>

            <div className="space-y-3 sm:space-y-4">
              {product.stock === 0 ? (
                <button className="w-full bg-gray-400 text-white py-3 sm:py-4 rounded-lg cursor-not-allowed font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  Out of Stock
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-700 text-white py-3 sm:py-4 rounded-lg hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handlebuyBtn}
                    className="w-full bg-white text-gray-900 py-3 sm:py-4 rounded-lg border border-gray-900 hover:bg-gray-50 transition flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                  >
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    Buy Now
                  </button>
                </>
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
              <p className="text-xs sm:text-sm text-blue-800">
                <span className="font-medium">Free delivery</span> available on
                orders over $50. Estimated delivery: 3-5 business days.
              </p>
            </div>

            {/* Product Features - Mobile version at the bottom */}
            <div className="sm:hidden bg-gray-50 rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-2 text-sm">
                Product Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-xs">Premium Quality Materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-xs">
                    Free Shipping on Orders Over $50
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-xs">30-Day Return Policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;

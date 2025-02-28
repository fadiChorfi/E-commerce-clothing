"use client";
import { ShoppingCartIcon } from "lucide-react";

const EmptyCartView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-50 p-3 mb-4">
        <ShoppingCartIcon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">Your cart is empty</h3>
      <p className="text-sm text-gray-500 max-w-xs mx-auto">
        Find something you like and add it to your cart to see it here.
      </p>
    </div>
  );
};

export default EmptyCartView;
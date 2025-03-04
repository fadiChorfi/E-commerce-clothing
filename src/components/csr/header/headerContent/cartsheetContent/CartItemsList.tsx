"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/Providers/CartProvider";
import { CartItem } from "@/types/types";

type CartItemsListProps = {
  cartItems: CartItem[];
};

const CartItemsList = ({ cartItems }: CartItemsListProps) => {
  const { removeFromCart } = useCart();

  return (
    <div className="space-y-3">
      {cartItems.map((item, index) => (
        <CartItemm 
          key={item.product.id ?? `cart-item-${index}`}
          item={item}
          onRemove={() => removeFromCart(item.product.id)}
        />
      ))}
    </div>
  );
};

type CartItemProps = {
  item: CartItem;
  onRemove: () => void;
};

const CartItemm = ({ item, onRemove }: CartItemProps) => {
  const { product, selectedColor, selectedSize, quantity = 1 } = item;
  
  return (
    <Card className="overflow-hidden border bg-white shadow-sm transition-all hover:shadow">
      <div className="flex p-3 gap-3">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={false}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col h-full justify-between">
            <div>
              <Link href={`/products/${product.id}`} passHref>
                <h3 className="font-medium text-sm line-clamp-1 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="mt-1 text-xs text-gray-500 space-y-1">
                <p>{product.category}</p>
                
                <div className="flex flex-wrap gap-x-3">
                  {selectedColor && (
                    <div className="flex items-center">
                      <span className="mr-1">Color:</span>
                      <span>{selectedColor}</span>
                    </div>
                  )}
                  
                  {selectedSize && (
                    <div className="flex items-center">
                      <span className="mr-1">Size:</span>
                      <span>{selectedSize}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <span className="mr-1">Qty:</span>
                    <span>{quantity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <p className="font-semibold">
                ${(Number(product.base_price) * quantity).toFixed(2)}
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-gray-200 text-xs"
                  onClick={onRemove}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartItemsList;
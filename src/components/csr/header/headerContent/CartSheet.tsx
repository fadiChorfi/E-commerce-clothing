"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/Providers/CartProvider";
import { useBuy } from "@/Providers/checkoutProvider";

const CartSheet = () => {
  const { cart, removeFromCart } = useCart();
  const {addToBuyItems} = useBuy();
  const router = useRouter();

  const handleaddToBuyItems = () => {
    const buyItems = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      variant: item.variant_id,
    }));
  
    addToBuyItems(buyItems); 
    router.push("/protected/checkOut");
  };
  

  return (
    <Sheet>
      <SheetTrigger className="p-2 hover:bg-gray-100 rounded-full relative">
        <ShoppingCart className="w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4 pb-4 border-b">
          <SheetTitle>Your cart ({cart.length})</SheetTitle>
          <SheetDescription>View and manage your cart items.</SheetDescription>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500">Find something you like and add it to your cart.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {cart.map((product, index) => (
              <Card key={product.product.id ?? `cart-item-${index}`} className="group overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={product.product.image}
                      alt={product.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link href={`/products/${product.product.id}`} passHref>
                          <h3 className="font-medium text-sm line-clamp-2 cursor-pointer">
                            {product.product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{product.product.category}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="font-semibold text-sm">${product.product.base_price}</p>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() => removeFromCart(product.product.id)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() =>
                          router.push(
                            `/checkout?productId=${product.product.id}&name=${encodeURIComponent(
                              product.product.name
                            )}&price=${product.product.base_price}`
                          )
                        }
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full"  onClick={handleaddToBuyItems} >
              Check out
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

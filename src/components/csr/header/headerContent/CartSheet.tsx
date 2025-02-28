"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/Providers/CartProvider";
import { Button } from "@/components/ui/button";
import EmptyCartView from "./cartsheetContent/EmptyCartView";
import CheckoutForm from "./cartsheetContent/CheckoutForm";
import OrderSummary from "./cartsheetContent/orderSummary";
import CartItemsList from "./cartsheetContent/CartItemsList";



const CartSheet = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutCart = () => {
    setShowCheckout(true);
  };

  const handleSubmitOrder = (data: any) => {
    console.log("Order submitted with shipping details:", data);
    console.log("Cart items:", cart);
    
    alert("Order placed successfully!");
    clearCart();
    setShowCheckout(false);
    router.push("/");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = Number(item.product.base_price);
      const itemQuantity = item.quantity || 1; 
      return total + (itemPrice * itemQuantity);
    }, 0).toFixed(2);
  };

  return (
    <Sheet>
      <SheetTrigger className="relative rounded-full p-2 transition-colors hover:bg-gray-100">
        <ShoppingCart className="h-5 w-5" />
        {cart.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
            {cart.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col overflow-hidden p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Your cart ({cart.length})</SheetTitle>
          <SheetDescription>View and manage your cart items.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <EmptyCartView />
          ) : showCheckout ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Checkout Information</h3>
              <CheckoutForm 
                onSubmit={handleSubmitOrder} 
                onBack={() => setShowCheckout(false)} 
              />
              <OrderSummary 
                cartItems={cart} 
                calculateTotal={calculateTotal} 
              />
            </div>
          ) : (
            <div className="space-y-4">
              <CartItemsList cartItems={cart} />
              
              <div className="border-t py-4">
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && !showCheckout && (
          <div className="border-t px-6 py-4">
            <Button
              className="w-full"
              onClick={handleCheckoutCart}
            >
              Check out
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
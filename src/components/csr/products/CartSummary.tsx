'use client'
import { Product } from '@/types/types'

interface CartSummaryProps {
  items: Product[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.base_price, 0)
  const tax = subtotal * 0.1 
  const shipping = items.length > 0 ? 10 : 0 
  const total = subtotal + tax + shipping

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button 
        className="w-full bg-black text-white py-3 rounded-lg mt-6"
        onClick={() => window.location.href = '/checkout'}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

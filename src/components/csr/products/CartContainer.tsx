/* 'use client'
import { useCart } from '@/Providers/CartProvider'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

export default function CartContainer() {
  const { cart, removeFromCart } = useCart()

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <CartItem
          key={item.product.id}
          item={item.product}
          onRemove={removeFromCart}
        />
        
      ))}
    </div>
  )
}


 */



import React from 'react'

const CartContainer = () => {
  return (
    <div>CartContainer</div>
  )
}

export default CartContainer
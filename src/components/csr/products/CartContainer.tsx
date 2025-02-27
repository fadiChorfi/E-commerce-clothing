'use client'
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
          key={item.id}
          item={item}
          onRemove={removeFromCart}
        />
        
      ))}
    </div>
  )
}



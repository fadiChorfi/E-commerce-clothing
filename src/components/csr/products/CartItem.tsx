'use client'
import { Product } from '@/types/types'

interface CartItemProps {
  item: Product;
  onRemove: (id: string) => Promise<{ success: boolean; error?: any }>;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  const handleRemove = async () => {
    const { success, error } = await onRemove(item.id)
    if (!success && error) {
      // You might want to add toast notification here
      console.error('Failed to remove item:', error)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-500">${item.base_price}</p>
        
        <button
          onClick={handleRemove}
          className="text-red-500 text-sm mt-2"
        >
          Remove
        </button>
      </div>
      
      <div className="font-medium">
        ${item.base_price}
      </div>
    </div>
  )
}
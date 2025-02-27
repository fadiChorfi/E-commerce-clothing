export default function EmptyCart() {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items to get started</p>
        <a href="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </a>
      </div>
    )
  }
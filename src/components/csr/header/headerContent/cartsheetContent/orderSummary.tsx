"use client";

type OrderSummaryProps = {
  cartItems: any[];
  calculateTotal: () => string;
};

const OrderSummary = ({ cartItems, calculateTotal }: OrderSummaryProps) => {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h4 className="font-medium mb-3">Order Summary</h4>
      <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
        {cartItems.map((item, index) => (
          <div key={`summary-${index}`} className="flex justify-between text-sm border-b pb-2">
            <div>
              <span className="font-medium">{item.product.name}</span>
              <div className="text-xs text-gray-500">
                {item.selectedColor && <span className="mr-2">Color: {item.selectedColor}</span>}
                {item.selectedSize && <span className="mr-2">Size: {item.selectedSize}</span>}
                <span>Qty: {item.quantity || 1}</span>
              </div>
            </div>
            <span>${(Number(item.product.base_price) * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Subtotal:</span>
          <span>${calculateTotal()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Shipping:</span>
          <span className="text-gray-500">Calculated at next step</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
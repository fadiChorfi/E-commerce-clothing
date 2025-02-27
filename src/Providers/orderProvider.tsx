"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import supabase from "@/supabase/client";

// ✅ Define TypeScript types
interface Order {
  id: string;
  user_id: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  shipping_address: Record<string, any>;
  created_at?: string;
}

interface OrderItem {
  id?: string;
  order_id: string;
  product_variant_id: string;
  quantity: number;
  unit_price: number;
}

interface OrderContextType {
  currentOrder: Order | null;
  createOrder: (
    userId: string,
    items: Omit<OrderItem, "order_id">[],
    shippingAddress: Record<string, any>
  ) => Promise<Order | null>;
}

const OrderContext = createContext<OrderContextType | null>(null);

// ✅ OrderContextProvider with Fixed Implementation
export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
    
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const createOrder = async (
    userId: string,
    items: Omit<OrderItem, "order_id">[], // Remove order_id since it's created later
    shippingAddress: Record<string, any>
  ): Promise<Order | null> => {
    try {
      const totalAmount = items.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      );

      // ✅ Insert order and retrieve its ID
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: userId,
            status: "pending",
            total_amount: totalAmount,
            shipping_address: shippingAddress,
          },
        ])
        .select()
        .single();

      if (orderError) throw new Error(orderError.message);

      // ✅ Insert order items with the retrieved order ID
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_variant_id: item.product_variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw new Error(itemsError.message);

      setCurrentOrder(order);
      return order; // ✅ Return order so components can use it
    } catch (error) {
      console.error("Order creation failed:", error);
      return null;
    }
  };

  return (
    <OrderContext.Provider value={{ currentOrder, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Custom Hook to Use Order Context
export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderContextProvider");
  }
  return context;
};

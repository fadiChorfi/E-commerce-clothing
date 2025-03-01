"use client";
import { useEffect, useState } from "react";
import supabase from "@/supabase/client";
import { useUser } from "@supabase/auth-helpers-react"; // Ensure you're handling authentication properly
import Image from "next/image";

interface Order {
  id: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  created_at: string;
  shipping_address: Record<string, string[]>;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_variant_id: string;
  quantity: number;
  unit_price: number;
  product_name?: string; // Join with the product table
  product_image?: string;
}

const OrdersPage = () => {
  const user = useUser(); // Get current authenticated user
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<{ [key: string]: OrderItem[] }>(
    {}
  );

  useEffect(() => {
    if (user) {
      fetchOrders(user.id);
    }
  }, [user]);

  const fetchOrders = async (userId: string) => {
    try {
      // ✅ Step 1: Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (ordersError) throw new Error(ordersError.message);

      setOrders(ordersData);

      // ✅ Step 2: Fetch order items for all orders
      const orderIds = ordersData.map((order) => order.id);
      if (orderIds.length === 0) return;

      const { data: orderItemsData, error: orderItemsError } = await supabase
        .from("order_items")
        .select("*, products(name, image)") // Join with the products table
        .in("order_id", orderIds);

      if (orderItemsError) throw new Error(orderItemsError.message);

      // ✅ Step 3: Organize items by order ID
      const groupedOrderItems: { [key: string]: OrderItem[] } = {};
      orderItemsData.forEach((item) => {
        const orderId = item.order_id;
        if (!groupedOrderItems[orderId]) {
          groupedOrderItems[orderId] = [];
        }
        groupedOrderItems[orderId].push({
          ...item,
          product_name: item.products?.name,
          product_image: item.products?.image,
        });
      });

      setOrderItems(groupedOrderItems);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg my-4">
            <h2 className="font-semibold">Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.total_amount.toFixed(2)}</p>
            <p>Ordered on: {new Date(order.created_at).toLocaleDateString()}</p>

            <h3 className="mt-2 font-semibold">Items:</h3>
            {orderItems[order.id]?.map((item) => (
              <div key={item.id} className="flex gap-4 my-2">
                <Image
                  src={item.product_image || "/placeholder.svg"}
                  alt={item.product_name || "Product image"}
                  width={50}
                  height={50}
                />

                <div>
                  <p>{item.product_name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.unit_price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;

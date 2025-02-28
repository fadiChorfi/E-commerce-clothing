"use client";
import { useBuy } from "@/Providers/checkoutProvider";
import { useState } from "react";

const Checkout = () => {
  const { buyItems, removeFromBuyItems } = useBuy(); 
  const [shippingMethod, setShippingMethod] = useState("standard");

  const subtotal = buyItems.reduce((acc, item) => {
  if (!item.product) return acc; // Skip items without product
  return acc + item.product.base_price * item.quantity;
}, 0);

  const shipping = shippingMethod === "express" ? 12.99 : 5.99;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Commande</h2>

      {buyItems.length > 0 ? (
        buyItems.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-4 border-b py-4">
            <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
            <div>
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">Quantité: {item.quantity}</p>
              <p className="text-gray-900">{item.product.base_price} DZD</p>
            </div>
            <button
              onClick={() => removeFromBuyItems(item.product.id)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <p className="p-6 text-gray-500">Votre panier est vide.</p>
      )}

      <div className="mt-6">
        <label className="block mb-2">Mode de livraison :</label>
        <select
          className="border p-2 rounded"
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
          <option value="standard">Standard - 5.99 DZD</option>
          <option value="express">Express - 12.99 DZD</option>
        </select>
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold">Sous-total: {subtotal.toFixed(2)} DZD</p>
        <p className="text-lg">Livraison: {shipping.toFixed(2)} DZD</p>
        <p className="text-lg">Taxe (19%): {tax.toFixed(2)} DZD</p>
        <p className="text-xl font-bold">Total: {total.toFixed(2)} DZD</p>
      </div>

      <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
        Confirmer la commande
      </button>
    </div>
  );
};

export default Checkout;

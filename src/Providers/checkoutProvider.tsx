"use client";
import { BuyItem, Product, ProductVariant } from "@/types/types";
import { createContext, useContext, useState } from "react";

type BuyContextType = {
  buyItems: BuyItem[];
  setBuyItems: (items: BuyItem[]) => void;
  addToBuyItems: (item: BuyItem[]) => void;
  removeFromBuyItems: (id: string) => void;
};

const BuyContext = createContext<BuyContextType | undefined>(undefined);

export const BuyProvider = ({ children }: { children: React.ReactNode }) => {
  const [buyItems, setBuyItems] = useState<BuyItem[]>([]);

  const addToBuyItems = (item: BuyItem) => {
    setBuyItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.product.id === item.product.id
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.product.id === item.product.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromBuyItems = (id: string) => {
    setBuyItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== id)
    );
  };

  return (
    <BuyContext.Provider
      value={{ buyItems, setBuyItems, addToBuyItems, removeFromBuyItems }}
    >
      {children}
    </BuyContext.Provider>
  );
};

export const useBuy = () => {
  const context = useContext(BuyContext);
  if (!context) {
    throw new Error("useBuy must be used within a BuyProvider");
  }
  return context;
};

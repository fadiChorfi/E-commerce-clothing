"use client";
import { createContext, useContext, useState } from "react";

type BuyItem = {
  id: string;
  quantity: number;
  color: string;
  size: string;
};

type BuyContextType = {
  buyItem: BuyItem | null;
  setBuyItem: (item: BuyItem | null) => void;
};

const BuyContext = createContext<BuyContextType | undefined>(undefined);

export const BuyProvider = ({ children }: { children: React.ReactNode }) => {
  const [buyItem, setBuyItem] = useState<BuyItem | null>(null);

  return (
    <BuyContext.Provider value={{ buyItem, setBuyItem }}>
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

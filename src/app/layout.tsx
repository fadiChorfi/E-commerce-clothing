import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/Providers/SupabaseProvider";
import { WishlistContextProvider } from "@/Providers/wishlistProvider";
import { CartContextProvider } from "@/Providers/CartProvider";
import { OrderContextProvider } from "@/Providers/orderProvider";
import { BuyProvider } from "@/Providers/checkoutProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IGRIS",
  description: "Clothing Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          
            <BuyProvider>
              <CartContextProvider>
                <WishlistContextProvider>
                  <OrderContextProvider>{children}</OrderContextProvider>
                </WishlistContextProvider>
              </CartContextProvider>
            </BuyProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

"use client";
import Link from "next/link";
import SearchBar from "./headerContent/SearchBar";
import WishlistSheet from "./headerContent/WishlistSheet";
import CartSheet from "./headerContent/CartSheet";
import ProfileBtn from "./headerContent/ProfileBtn";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="w-full h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          <Link
            href="/"
            className="transition-transform hover:scale-105 duration-200"
          >
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-primary">IGRIS</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8 flex-1 max-w-md mx-auto">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative group p-1">
              <WishlistSheet />
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out -translate-x-1/2"></span>
            </div>

            <div className="relative group p-1">
              <CartSheet />
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out -translate-x-1/2"></span>
            </div>

            <div className="p-2 hover:bg-gray-100 hover:text-primary rounded-full relative transition-colors duration-200">
              <ProfileBtn />
            </div>
          </div>
        </div>

        <div className="mt-2 md:hidden">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </nav>
    </header>
  );
};

export default Header;

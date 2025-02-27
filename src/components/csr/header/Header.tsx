"use client";

import Link from "next/link";
import SearchBar from "./headerContent/SearchBar";
import WishlistSheet from "./headerContent/WishlistSheet";
import CartSheet from "./headerContent/CartSheet";
import ProfileBtn from "./headerContent/ProfileBtn";
 


const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-row justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Fashion Store</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
             <SearchBar/> 
          </div> 

          <div className="flex items-center gap-4">
             <WishlistSheet /> 

             <CartSheet /> 
            <div className="p-2 hover:bg-gray-100 rounded-full relative">
               <ProfileBtn /> 
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

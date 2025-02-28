"use client";
import React from "react";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-sm">
     <Input
        type="text"
        placeholder="Search..."
        className="h-10 pl-4 pr-12 rounded-lg border-gray-300 focus:border-blue-500 
          focus:ring-2 focus:ring-blue-200 focus:ring-offset-0 transition-all 
          placeholder:text-gray-400 text-gray-800"
          spellCheck="false"
          data-ms-editor="true"
      />
      <Button
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-slate-200
          hover:bg-slate-400 active:bg-blue-700 transition-colors shadow-sm
          hover:shadow-md active:shadow-sm"
      >
        <SearchIcon className="h-4 w-4 text-black" />
      </Button> 
    </div>
  );
};

export default SearchBar;
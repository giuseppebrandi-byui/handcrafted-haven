"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchBox = () => {
  const [selection, setSelection] = useState("artisan");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const artisanSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchTerm.includes(" ") && searchTerm.trim() !== "") {
      router.push(`/artisan/${searchTerm}`);
    } else {
      alert("Search term must be a single word without spaces.");
    }
  };

  const productSearch = (event: React.FormEvent) => {
    // This is the function that we will implement to handle everything related to the product search.
    event.preventDefault();
    alert("Not implemented yet " + searchTerm)
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="flex items-center space-x-4 bg-white shadow-md rounded-full px-2 py-1">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selection === 'artisan' ? 'bg-blue-500 text-white' : 'text-gray-600'
          }`}
          onClick={() => setSelection('artisan')}
        >
          Artisan
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selection === 'product' ? 'bg-blue-500 text-white' : 'text-gray-600'
          }`}
          onClick={() => setSelection('product')}
        >
          Product
        </button>
      </div>

      <div className="mt-8">
        {selection === 'artisan' && (
    <form onSubmit={artisanSearch} className="flex gap-2 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded"
      />
      <Button className="w-full py-4 px-2 h-4 justify-start">Search</Button>
          </form>
        )}
        {selection === 'product' && (
          // Here we will insert the component to display all products or a particular category  
        <form onSubmit={productSearch} className="flex gap-2 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded"
      />
      <Button className="w-full py-4 px-2 h-4 justify-start">Search</Button>
          </form>
        )}
      </div>
    </div>  
  );
};

export default SearchBox;

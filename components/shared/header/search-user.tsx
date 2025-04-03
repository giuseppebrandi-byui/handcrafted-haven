"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchTerm.includes(" ") && searchTerm.trim() !== "") {
      router.push(`/artisan/${searchTerm}`);
    } else {
      alert("Search term must be a single word without spaces.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded"
      />
      <Button className="w-full py-4 px-2 h-4 justify-start">Search</Button>
    </form>
  );
};

export default SearchBox;

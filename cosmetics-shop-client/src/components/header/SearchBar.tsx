import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-[400px]">
        <input
          type="text"
          placeholder="Search for Products, Brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border-2 border-pink-500 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onClose,
}) => {
  return (
    <div className="w-full flex items-center justify-center space-x-3">
      <input
        type="text"
        placeholder="Search"
        className="border-b border-black outline-none px-2 py-1 w-[80%] sm:w-1/2 text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      <FiSearch size={18} className="cursor-pointer" />
      <FiX size={18} className="cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default SearchBar;

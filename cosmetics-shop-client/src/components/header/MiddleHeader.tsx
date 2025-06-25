"use client";

import React, { useState } from "react";
import logo from "../../assets/logo/cosmetic-logo.jpeg";
import Image from "next/image";
import Container from "../Container/Container";
import { FiSearch, FiMenu } from "react-icons/fi";
import SearchBar from "./SearchBar";
import HeaderIcons from "./HeaderIcon";

interface MiddleHeaderProps {
  toggleMobileMenu: () => void;
}

const MiddleHeader: React.FC<MiddleHeaderProps> = ({ toggleMobileMenu }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm("");
  };

  return (
    <div className="relative z-50 bg-white">
      <Container className="py-4 px-2 sm:px-4">
        {!isSearchOpen ? (
          <div className="flex items-center justify-between gap-4 sm:gap-6 lg:gap-20">
            {/* Mobile: Hamburger Icon / Desktop: Search Icon */}
            <div className="flex items-center cursor-pointer">
              <div className="md:hidden" onClick={toggleMobileMenu}>
                <FiMenu size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="hidden md:flex" onClick={toggleSearch}>
                <FiSearch size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center flex-1">
              <Image
                src={logo}
                alt="logo"
                className="h-8 sm:h-8 w-auto object-contain"
                priority
              />
            </div>

            {/* Mobile: Search Icon / Desktop: Icons */}
            <div className="flex items-center">
              <div className="md:hidden" onClick={toggleSearch}>
                <FiSearch size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="hidden md:flex">
                <HeaderIcons />
              </div>
            </div>
          </div>
        ) : (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClose={toggleSearch}
          />
        )}
      </Container>
    </div>
  );
};

export default MiddleHeader;

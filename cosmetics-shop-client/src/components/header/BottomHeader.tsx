"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Container from "../Container/Container";
import { navigation } from "@/constants";
import { FiChevronDown, FiX, FiChevronRight, FiUser } from "react-icons/fi";
import clsx from "clsx";

interface BottomHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const BottomHeader: React.FC<BottomHeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setExpandedMenu(null);
  };

  const toggleSubMenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  return (
    <div className="border-b border-gray-100 bg-white z-50 relative">
      <Container className="py-4 sm:py-6 md:py-10 relative">
        {/* Desktop: Original Menu */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navigation.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredMenu(item.title)}
              onMouseLeave={() => setHoveredMenu(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className="text-sm text-gray-500 font-medium hover:text-pink-600 flex items-center gap-2"
              >
                {item.title}
                {item.dropdown && <FiChevronDown size={14} />}
              </Link>

              {/* Desktop Dropdown */}
              {item.dropdown && hoveredMenu === item.title && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-md border border-gray-200 z-50">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="group relative text-gray-500"
                    >
                      <Link
                        href={subItem.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 font-medium text-gray-500"
                      >
                        {subItem.title}
                      </Link>

                      {/* Nested Sub Items */}
                      {subItem.subItems && subItem.subItems.length > 0 && (
                        <div className="absolute top-0 left-full mt-0 ml-1 w-64 bg-white border border-gray-200 shadow-md hidden group-hover:block z-50">
                          {subItem.subItems.map((child, childIndex) => (
                            <Link
                              key={childIndex}
                              href={child.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-500"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Dropdown Menu Below Header */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white z-50">
            {/* Header of the mobile menu */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">HOK MAKEUP</h1>
              <button onClick={toggleMobileMenu} aria-label="Close menu">
                <FiX size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <p className="text-pink-600 font-medium mb-4">
                We Value Every Point You Earn!
              </p>
              {navigation.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <div
                    className="flex items-center justify-between py-4 text-gray-800 font-medium"
                    onClick={() => item.dropdown && toggleSubMenu(item.title)}
                  >
                    <Link
                      href={item.href}
                      className="flex-1"
                      onClick={() =>
                        !item.dropdown && setIsMobileMenuOpen(false)
                      }
                    >
                      {item.title}
                    </Link>
                    {item.dropdown && (
                      <FiChevronRight
                        size={20}
                        className={clsx(
                          "transition-transform",
<<<<<<< HEAD:components/header/BottomHeader.tsx
                          expandedMenu === item.title && "rotate-90",
=======
                          expandedMenu === item.title && "rotate-90"
>>>>>>> 829d0d3f2b9e22d227299059ad4f3c8a443a03fd:src/components/header/BottomHeader.tsx
                        )}
                      />
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  {item.dropdown && expandedMenu === item.title && (
                    <div className="pl-4 pb-4 space-y-3">
                      {item.dropdown.map((subItem, subIndex) => (
                        <div key={subIndex}>
                          <Link
                            href={subItem.href}
                            className="block text-gray-600 hover:text-pink-600 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                          {subItem.subItems && subItem.subItems.length > 0 && (
                            <div className="pl-4 space-y-2 mt-2">
                              {subItem.subItems.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  className="block text-gray-500 hover:text-pink-600 text-sm"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="py-4">
                <Link
                  href="/rewards"
                  className="flex items-center gap-2 text-gray-800 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-yellow-500">★</span> Hok Rewards
                </Link>
              </div>
            </div>

            {/* Footer: Login */}
            <div className="p-4 border-t border-gray-200">
              <Link
                href="/login"
                className="flex items-center gap-2 text-gray-800 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiUser size={20} />
                Log In
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default BottomHeader;

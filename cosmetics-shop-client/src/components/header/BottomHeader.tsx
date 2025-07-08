"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FiChevronDown, FiX, FiChevronRight, FiUser } from "react-icons/fi";
import clsx from "clsx";
import Container from "../Container/Container";
import { navigation } from "@/constants/navigation";

interface BottomHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const BottomHeader: React.FC<BottomHeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setExpandedMenu(null);
  };

  const toggleSubMenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  const handleMenuClick = (title: string, href?: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    if (href) {
      // Navigate if href exists (e.g., for items without dropdown)
      window.location.href = href;
    } else {
      setClickedMenu((prev) => (prev === title ? null : title));
    }
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setClickedMenu(null);
    }, 200);
    setTimeoutId(id);
  };

  return (
    <div className="border-b border-gray-100 bg-white z-50 relative">
      <Container className="py-4 sm:py-6 md:py-10 relative">
        <div className="hidden md:flex items-center justify-center space-x-8">
          {navigation.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                handleMenuClick(
                  item.title,
                  item.dropdown ? undefined : item.href
                )
              }
              onMouseLeave={handleMouseLeave}
              className="relative cursor-pointer"
            >
              <div
                className="text-sm text-gray-500 font-medium hover:text-pink-600 flex items-center gap-2 pb-3"
                aria-haspopup={!!item.dropdown}
                aria-expanded={clickedMenu === item.title}
              >
                {item.title}
                <FiChevronDown size={14} />
              </div>
              {item.dropdown && clickedMenu === item.title && (
                <div
                  className={clsx(
                    "absolute  top-[100%] left-0  w-64 bg-white shadow-md border border-gray-200 z-50 flex flex-col ",
                    "transition-all duration-200 ease-in-out",
                    clickedMenu === item.title
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[-10px] pointer-events-none"
                  )}
                >
                  {item.dropdown.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="group relative text-gray-500 "
                      onClick={() => toggleSubMenu(subItem.title)}
                    >
                      <div
                        className={clsx(
                          "block px-4 py-2 text-sm hover:bg-gray-100 font-medium text-gray-500 flex justify-between items-center ",
                          subItem.subItems && "cursor-pointer"
                        )}
                      >
                        {subItem.title}
                        <FiChevronDown size={14} />
                      </div>
                      {subItem.subItems && subItem.subItems.length > 0 && (
                        <div
                          className={clsx(
                            "absolute top-0 left-[100%] mt-[-2px] ml-[-1px] w-64 bg-white border border-gray-200 shadow-md flex flex-col",
                            "transition-all duration-200 ease-in-out",
                            expandedMenu === subItem.title
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-[-10px] pointer-events-none",
                            "hidden group-hover:flex z-50"
                          )}
                        >
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
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white z-50">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">HOK MAKEUP</h1>
              <button onClick={toggleMobileMenu} aria-label="Close menu">
                <FiX size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-pink-600 font-medium mb-4">
                We Value Every Point You Earn!
              </p>
              {navigation.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <div
                    className="flex items-center justify-between py-4 text-gray-800 font-medium"
                    onClick={() => toggleSubMenu(item.title)}
                    role="button"
                    aria-haspopup={!!item.dropdown}
                    aria-expanded={expandedMenu === item.title}
                  >
                    <div
                      onClick={() =>
                        !item.dropdown && handleMenuClick(item.title, item.href)
                      }
                    >
                      {item.title}
                    </div>
                    <FiChevronRight size={20} />
                  </div>
                  {item.dropdown && expandedMenu === item.title && (
                    <div className="pl-4 pb-4 space-y-3">
                      {item.dropdown.map((subItem, subIndex) => (
                        <div key={subIndex}>
                          <div
                            className="block text-gray-600 hover:text-pink-600 py-1 flex justify-between items-center"
                            onClick={() => toggleSubMenu(subItem.title)}
                          >
                            {subItem.title}
                            <FiChevronRight size={14} />
                          </div>
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

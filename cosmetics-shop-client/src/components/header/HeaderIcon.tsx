'use client';

import React from 'react';
import { FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';

const HeaderIcons = () => {
  return (
    <div className="flex items-center space-x-4 sm:space-x-6">
      {/* User */}
      <FiUser size={18} className="sm:w-5 sm:h-5 w-4 h-4" />

      {/* Wishlist */}
      <div className="relative">
        <FiHeart size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
        <span className="absolute -top-2 -right-2 text-xs text-blue-600">(0)</span>
      </div>

      {/* Cart */}
      <div className="relative">
        <FiShoppingBag size={18} className="sm:w-5 sm:h-5 w-4 h-4" />
        <span className="absolute -top-2 -right-2 text-xs text-blue-600">(0)</span>
      </div>
    </div>
  );
};

export default HeaderIcons;
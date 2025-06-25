/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

const categories = [
  {
    label: "Face",
    icon: "https://hokmakeup.com/cdn/shop/files/Artboard_1_3cb2f975-6104-4d45-a717-e1cece1ef390.jpg?v=1744977588",
  },
  {
    label: "Lips",
    icon: "https://hokmakeup.com/cdn/shop/files/Artboard_2_ef8f3dc7-6590-4d58-a9da-182535faba8a.jpg?v=1744977589",
  },
  {
    label: "Eyes",
    icon: "https://hokmakeup.com/cdn/shop/files/Artboard_3_84147636-84c4-4149-aed9-cfd03354d387.jpg?v=1744977589",
  },
];

const CategoryTabs = () => {
  return (
    <div className="flex justify-center space-x-8 my-6">
      {categories.map((cat, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <img
            src={cat.icon}
            alt={cat.label}
            className="w-54 h-54 mb-3" // Increased size from w-12 h-12 to w-16 h-16, adjusted margin
          />
          <span className="text-base font-semibold">{cat.label}</span>{" "}
          {/* Increased font size from text-sm to text-base */}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;

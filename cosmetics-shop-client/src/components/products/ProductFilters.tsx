"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

// Updated JSON data with dummy options for all categories
const filtersData = [
  {
    category: "PRODUCT TYPE",
    options: [
      { name: "Foundation", count: 320 },
      { name: "Concealer", count: 150 },
      { name: "Powder", count: 90 },
      { name: "Blush", count: 60 },
    ],
    isCollapsible: true,
  },
  {
    category: "BRAND",
    options: [
      { name: "Maybelline", count: 200 },
      { name: "L'Oréal", count: 180 },
      { name: "Fenty Beauty", count: 120 },
      { name: "MAC", count: 100 },
    ],
    isCollapsible: true,
  },
  {
    category: "COLOR",
    options: [
      { name: "Nude", count: 250 },
      { name: "Pink", count: 180 },
      { name: "Red", count: 130 },
      { name: "Coral", count: 70 },
    ],
    isCollapsible: true,
  },
  {
    category: "PRODUCT FINISH",
    options: [
      { name: "Matte", count: 400 },
      { name: "Dewy", count: 200 },
      { name: "Satin", count: 150 },
      { name: "Natural", count: 80 },
    ],
    isCollapsible: true,
  },
  {
    category: "MAKEUP PRODUCT TYPE",
    options: [
      { name: "Blush Stick", count: 50 },
      { name: "Bronzer", count: 70 },
      { name: "Eye Palette", count: 120 },
      { name: "Lip Tint", count: 90 },
    ],
    isCollapsible: true,
  },
  {
    category: "PRODUCT COVERAGE",
    options: [
      { name: "Full Coverage", count: 536 },
      { name: "Light Coverage", count: 21 },
      { name: "Medium Coverage", count: 55 },
      { name: "Medium Full Coverage", count: 5 },
    ],
    isCollapsible: true,
  },
  {
    category: "FORMULATION",
    options: [
      { name: "Liquid", count: 300 },
      { name: "Cream", count: 150 },
      { name: "Powder", count: 100 },
      { name: "Stick", count: 50 },
    ],
    isCollapsible: true,
  },
  {
    category: "INGREDIENTS CONSCIOUS",
    options: [
      { name: "Vegan", count: 200 },
      { name: "Cruelty-Free", count: 300 },
      { name: "Paraben-Free", count: 150 },
      { name: "Organic", count: 80 },
    ],
    isCollapsible: true,
  },
  {
    category: "PRODUCT WEIGHT",
    options: [
      { name: "Under 1 oz", count: 100 },
      { name: "1-2 oz", count: 200 },
      { name: "2-3 oz", count: 150 },
      { name: "Over 3 oz", count: 50 },
    ],
    isCollapsible: true,
  },
  {
    category: "SKIN TONE",
    options: [
      { name: "Light", count: 250 },
      { name: "Medium", count: 200 },
      { name: "Tan", count: 150 },
      { name: "Deep", count: 100 },
    ],
    isCollapsible: true,
  },
];

const ProductFilters = () => {
  // State to manage which categories are expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  // Toggle the expanded state of a category
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="p-4 w-full md:w-1/4">
      <h4 className="mb-1">Filter:</h4>
      {filtersData.map((filter, idx) => (
        <div key={idx} className="mb-2">
          {/* Category Title with optional collapse toggle */}
          <div
            className="flex justify-between items-center cursor-pointer text-gray-500 border-b-1 border-gray-200 mt-5"
            onClick={() =>
              filter.isCollapsible && toggleCategory(filter.category)
            }
          >
            <span className="text-sm font-medium mb-3">{filter.category}</span>
            <span className="text-gray-500 text-sm mb-3">
              {filter.isCollapsible && expandedCategories[filter.category] ? (
                <MdOutlineKeyboardArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </span>
          </div>

          {/* Options (checkboxes) - shown only if category is expanded or not collapsible */}
          {(!filter.isCollapsible || expandedCategories[filter.category]) && (
            <div className="ml-2 mt-1">
              {filter.options.length > 0 ? (
                filter.options.map((option, optIdx) => (
                  <div key={optIdx} className="mb-1">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox mr-2 border"
                      />
                      <span className="text-sm text-gray-500">
                        {option.name} ({option.count})
                      </span>
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500"></div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFilters;

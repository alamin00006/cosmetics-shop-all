import React from "react";
import { FiRefreshCw } from "react-icons/fi";

import "react-tagsinput/react-tagsinput.css";
import Filters from "../filters/Filters";

const InvestmentFilter = ({
  setProjectId,
  setProfitShareType,
  setStatus,
  status,
  setSearchQuery,
  setTags,
  tags,
}) => {
  // Reset all filters
  const resetFilters = () => {
    setTags([]);
    setSearchQuery("");
    setProjectId("");
    setStatus("");
    setProfitShareType("");
  };

  return (
    <div className="">
      {/* Filter Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Search</h2>
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          aria-label="Reset all filters"
        >
          <FiRefreshCw className="text-base" />
          Reset Search
        </button>
      </div>

      {/* Filter Grid */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Status Selection */}
          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Select Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              aria-describedby="status-help"
            >
              <option value="" disabled>
                Select a status
              </option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Canceled">Canceled</option>
            </select>
            <p id="status-help" className="mt-1 text-xs text-gray-500">
              Filter by order status.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input with Tags */}
      <div className="flex flex-col">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Search orders
        </label>

        <Filters
          setSearchQuery={setSearchQuery}
          setTags={setTags}
          tags={tags}
          searchName="Search Order"
        />

        <p id="search-help" className="mt-1 text-xs text-gray-500">
          Add tags for Customer name, amount, etc.
        </p>
      </div>
    </div>
  );
};

export default InvestmentFilter;

import { returnTypes } from "@/constants/returnType";
import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css"; // Default CSS for react-tagsinput
import Filters from "../filters/Filters";

const InvestmentFilter = ({
  projectId,
  setProjectId,
  projects,
  setProfitShareType,
  profitShareType,
  setStatus,
  status,
  setSearchQuery,
  setTags,
  tags,
}) => {
  // Handle tag changes and update searchQuery
  const handleTagsChange = (newTags) => {
    const filteredTags = newTags.filter((tag) => tag.trim());
    setTags(filteredTags);
    setSearchQuery(filteredTags.join(","));
  };

  // Reset all filters
  const resetFilters = () => {
    setTags([]);
    setSearchQuery("");
    setProjectId("");
    setStatus("");
    setProfitShareType("");
  };

  // Custom render for input to match Tailwind styling
  const renderInput = (props) => {
    return (
      <input
        {...props}
        className="flex-1 border-0 bg-transparent px-2 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
        placeholder="Search Investments..."
      />
    );
  };

  // Custom render for tags to match Tailwind styling
  const renderTag = (props) => {
    const { tag, key, onRemove, getTagDisplayValue } = props;
    return (
      <span
        key={key}
        className="mr-2 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-all duration-200 hover:bg-blue-200"
      >
        {getTagDisplayValue(tag)}
        <button
          type="button"
          onClick={() => onRemove(key)}
          className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-white hover:bg-blue-400 focus:outline-none"
          aria-label={`Remove ${tag}`}
        >
          ×
        </button>
      </span>
    );
  };

  // Custom layout to add Clear All button
  const renderLayout = (tagComponents, inputComponent) => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {tagComponents}
        {inputComponent}
        {tags.length > 0 && (
          <button
            type="button"
            onClick={() => handleTagsChange([])}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Clear All
          </button>
        )}
      </div>
    );
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
          {/* Project Selection */}
          <div className="flex flex-col">
            <label
              htmlFor="project"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Select Project
            </label>
            <select
              id="project"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              aria-describedby="project-help"
            >
              <option value="" disabled>
                Select a project
              </option>
              {projects?.map((project) => (
                <option key={project?._id} value={project?._id}>
                  {project?.projectTitle}
                </option>
              ))}
            </select>
            <p id="project-help" className="mt-1 text-xs text-gray-500">
              Filter investments by project.
            </p>
          </div>

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
              Filter by investment status.
            </p>
          </div>

          {/* Return Type Selection */}
          <div className="flex flex-col">
            <span className="mb-2 text-sm font-medium text-gray-700">
              Select Return Type
            </span>
            <div className="mt-2 flex flex-wrap gap-4">
              {returnTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-gray-700"
                  htmlFor={`return-type-${type}`}
                >
                  <input
                    id={`return-type-${type}`}
                    type="radio"
                    value={type}
                    name="return-type"
                    checked={profitShareType === type}
                    onChange={() => setProfitShareType(type)}
                    className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-200 focus:ring-opacity-50"
                    aria-describedby="return-type-help"
                  />
                  <span className="text-sm font-medium">{type}</span>
                </label>
              ))}
            </div>
            <p id="return-type-help" className="mt-1 text-xs text-gray-500">
              Choose the profit share type.
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
          Search Investments
        </label>

        <Filters
          setSearchQuery={setSearchQuery}
          setTags={setTags}
          tags={tags}
          searchName="Search Investment"
        />

        <p id="search-help" className="mt-1 text-xs text-gray-500">
          Add tags for investor name, amount, etc.
        </p>
      </div>
    </div>
  );
};

export default InvestmentFilter;

import { useState } from "react";

const Tabs = ({ setActiveTab, activeTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex flex-wrap pt-3 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="flex-1">
        <span
          onClick={() => handleTabClick("Details")}
          className={`block px-1 py-2 ${
            activeTab === "Details"
              ? "text-white bg-primary dark:bg-gray-800 dark:text-blue-500 "
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          } rounded-t-lg cursor-pointer`}
        >
          Details
        </span>
      </li>
      <li className="flex-1">
        <span
          onClick={() => handleTabClick("Financials")}
          className={`block px-1 py-2 ${
            activeTab === "Financials"
              ? "text-white bg-primary dark:bg-gray-800 dark:text-blue-500 "
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "
          } rounded-t-lg cursor-pointer`}
        >
          Financials
        </span>
      </li>
      <li className="flex-1">
        <span
          onClick={() => handleTabClick("Documents")}
          className={`block px-1 py-2 ${
            activeTab === "Documents"
              ? "text-white bg-primary dark:bg-gray-800 dark:text-blue-500 "
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "
          } rounded-t-lg cursor-pointer`}
        >
          Documents
        </span>
      </li>
      {/* <li className="flex-1">
        <span
          onClick={() => handleTabClick("Market")}
          className={`block px-1 py-2 ${
            activeTab === "Market"
              ? "text-white bg-primary dark:bg-gray-800 dark:text-blue-500"
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          } rounded-t-lg cursor-pointer`}
        >
          Market
        </span>
      </li> */}
      <li className="flex-1">
        <span
          onClick={() => handleTabClick("Timeline")}
          className={`block px-1 py-2 ${
            activeTab === "Timeline"
              ? "text-white bg-primary dark:bg-gray-800 dark:text-blue-500 "
              : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 "
          } rounded-t-lg cursor-pointer`}
        >
          Timeline
        </span>
      </li>
      {/* Add more tabs similarly */}
    </ul>
  );
};

export default Tabs;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import CategoryUpdate from "./CategoryUpdate";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetProjectCategoriesQuery } from "@/redux/api/projectCategoryApi";

const CategoryList = () => {
  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const handleShowModal = (returnData) => {
    setSelectCategory(returnData);
    setShowEditModal(true);
  };

  // Get Project Categories
  const {
    data: projectCategories,
    error: projectGetError,
    isLoading,
  } = useGetProjectCategoriesQuery();

  return (
    <div className="p-6">
      <h2 className="font-bold">Category List</h2>
      <div className="mb-4 flex items-center justify-end">
        <Link href="/create-category">
          <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            Add New Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>No</th>
              <th>Category Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white">
            {projectCategories?.map((category, index) => (
              <tr key={category._id}>
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">{category.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {category.createdAt}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {category.updatedAt}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    onClick={() => handleShowModal(category)}
                    className="text-teal-600 hover:text-teal-500"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Update Modal */}
      {selectCategory && (
        <CategoryUpdate
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          selectCategory={selectCategory}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CategoryList;

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import CategoryUpdate from "./CategoryUpdate";
import { getBaseUrl } from "@/helpers/config/envConfig";
import {
  useGetProductCategoriesQuery,
  useGetProductMainCategoriesQuery,
  useGetProductSubCategoriesQuery,
} from "@/redux/api/productCategoryApi";

const CategoryList = () => {
  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [route, setRoute] = useState(null);

  const handleShowModal = (returnData, updateCategoryRoute) => {
    setSelectCategory(returnData);
    setShowEditModal(true);
    setRoute(updateCategoryRoute);
  };

  // Get Main Categories
  const {
    data: productMainCategories,
    error: projectMainCategoriesError,
    isLoading: projectMainCategoryLoading,
    refetch: productMainCategoriesRefetch,
  } = useGetProductMainCategoriesQuery();
  // Get Project Categories
  const {
    data: productCategories,
    error: projectGetError,
    isLoading,
    refetch: productCategoryRefetch,
  } = useGetProductCategoriesQuery();
  // Get Sub Categories
  const {
    data: subCategories,
    error: subCategoriesError,
    isLoading: subCategoriesLoading,
    refetch: subCategoryRefetch,
  } = useGetProductSubCategoriesQuery();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Link href="/create-category">
          <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            Add New Category
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <h2 className="font-bold mb-4">Main Category</h2>
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
            {productMainCategories?.map((category, index) => (
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
                    onClick={() => {
                      handleShowModal(category);
                      setRoute("main-categories");
                    }}
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
      {/* Category  */}
      <div className="overflow-x-auto mt-5">
        <h2 className="font-bold mb-4"> Category</h2>
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
            {productCategories?.map((category, index) => (
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
                    onClick={() => {
                      handleShowModal(category);
                      setRoute("category");
                    }}
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
      {/* Sub Category  */}
      <div className="overflow-x-auto mt-5">
        <h2 className="font-bold mb-4">Sub Category</h2>
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
            {subCategories?.map((category, index) => (
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
                    onClick={() => {
                      handleShowModal(category);
                      setRoute("subcategories");
                    }}
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
          route={route}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CategoryList;

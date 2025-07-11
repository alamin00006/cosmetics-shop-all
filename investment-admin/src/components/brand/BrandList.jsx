"use client";

import { useState } from "react";

import { Toaster } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

import { useGetBrandsQuery } from "@/redux/api/brandApi";
import CategoryUpdate from "../categories/CategoryUpdate";

const BrandList = () => {
  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [route, setRoute] = useState(null);

  const handleShowModal = (returnData, updateCategoryRoute) => {
    setSelectCategory(returnData);
    setShowEditModal(true);
    setRoute(updateCategoryRoute);
  };

  // Get Brands
  const {
    data: brands,
    error: brandGetError,
    isLoading,
    refetch,
  } = useGetBrandsQuery();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-end">
        <Link href="/add-brand">
          <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            Add New Brand
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <h2 className="font-bold mb-4">All Brands</h2>
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>No</th>
              <th>Brand Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-gray-200 divide-y bg-white">
            {brands?.map((brand, index) => (
              <tr key={brand._id}>
                <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">{brand.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {brand.createdAt}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {brand.updatedAt}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    onClick={() => {
                      handleShowModal(brand);
                      setRoute("brands");
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

export default BrandList;

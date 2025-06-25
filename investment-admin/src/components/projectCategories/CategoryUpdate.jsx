"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getBaseUrl } from "@/helpers/config/envConfig";

const CategoryUpdate = ({
  showEditModal,
  setShowEditModal,
  selectCategory,
}) => {
  const handleCloseModal = () => setShowEditModal(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name: e.target.name.value,
    };

    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${getBaseUrl()}/category/${selectCategory?._id}`,
        categoryData
      );
      toast.success(data?.message);
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showEditModal && (
        <div
          className="bg-gray-500 fixed inset-0 flex items-center justify-center bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-semibold">Category Update</h3>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="text-gray-700 block text-sm font-medium"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Type Category Name"
                  name="name"
                  required
                  defaultValue={selectCategory?.name}
                  className="border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 disabled:bg-teal-300"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryUpdate;

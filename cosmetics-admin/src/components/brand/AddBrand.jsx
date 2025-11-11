"use client";
import { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import toast, { Toaster } from "react-hot-toast";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";

const AddBrand = () => {
  // State for form data
  const [files, setFiles] = useState([]);
  const [brand, setBrand] = useState({
    name: "",
    description: "",
  });

  // Handle form submissions
  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl;
      if (files.length > 0) {
        imageUrl = await uploadImageToImgBB(files[0]);
      }
      await axios.post(`${getBaseUrl()}/brands`, {
        ...brand,
        image: imageUrl,
      });
      toast.success("Brand created!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      e.target.reset();
      setFiles([]);
      setBrand({});
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Brand Management</h1>

      {/* Main Category Form */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleMainCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand Name
            </label>
            <input
              type="text"
              value={brand.name}
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              placeholder="Brand Name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              value={brand.description}
              onChange={(e) =>
                setBrand({ ...brand, description: e.target.value })
              }
              placeholder="Brand Description"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-40"
              required
            />
          </div>
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Image (optional)
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Brand
          </button>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddBrand;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import toast, { Toaster } from "react-hot-toast";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";
import {
  useGetProductCategoriesQuery,
  useGetProductMainCategoriesQuery,
} from "@/redux/api/productCategoryApi";

const AddCategory = () => {
  // State for form data
  const [files, setFiles] = useState([]);
  const [mainCategory, setMainCategory] = useState({
    name: "",
    description: "",
  });
  const [category, setCategory] = useState({
    name: "",
    description: "",
    mainCategoryId: "",
  });
  const [subCategory, setSubCategory] = useState({
    name: "",
    description: "",
    categoryId: "",
  });

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
  // // Get Sub Categories
  // const {
  //   data: subCategories,
  //   error: subCategoriesError,
  //   isLoading: subCategoriesLoading,
  //   refetch: subCategoryRefetch,
  // } = useGetProductSubCategoriesQuery();

  // Handle form submissions
  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl;
      if (files.length > 0) {
        imageUrl = await uploadImageToImgBB(files[0]);
      }
      await axios.post(`${getBaseUrl()}/main-categories`, {
        ...mainCategory,
        image: imageUrl,
      });
      toast.success("Main Category created!");

      productMainCategoriesRefetch();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      e.target.reset();
      setFiles([]);
      setMainCategory({});
      setCategory({});
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl;
      if (files.length > 0) {
        imageUrl = await uploadImageToImgBB(files[0]);
      }
      await axios.post(`${getBaseUrl()}/category`, {
        ...category,
        image: imageUrl,
      });
      toast.success("Category created!");

      productCategoryRefetch();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      e.target.reset();
      setFiles([]);
      setCategory({});
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl;
      if (files.length > 0) {
        imageUrl = await uploadImageToImgBB(files[0]);
      }

      await axios.post(`${getBaseUrl()}/subcategories`, {
        ...subCategory,
        image: imageUrl,
      });
      toast.success("SubCategory created!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
    } finally {
      e.target.reset();
      setFiles([]);
      setSubCategory({});
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Category Management
      </h1>

      {/* Main Category Form */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Main Category</h2>
        <form onSubmit={handleMainCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={mainCategory.name}
              onChange={(e) =>
                setMainCategory({ ...mainCategory, name: e.target.value })
              }
              placeholder="Main Category"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Main Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Main Category
          </button>
        </form>
      </div>

      {/* Category Form */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              placeholder="Category Name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Category
            </label>
            <select
              value={category.mainCategoryId}
              onChange={(e) =>
                setCategory({ ...category, mainCategoryId: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Main Category</option>
              {productMainCategories?.map((mc) => (
                <option key={mc._id} value={mc._id}>
                  {mc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* SubCategory Form */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create Sub Category</h2>
        <form onSubmit={handleSubCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="sub-category"
              value={subCategory.name}
              onChange={(e) =>
                setSubCategory({ ...subCategory, name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={subCategory.categoryId}
              onChange={(e) =>
                setSubCategory({ ...subCategory, categoryId: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Category</option>
              {productCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Sub Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Sub Category
          </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddCategory;

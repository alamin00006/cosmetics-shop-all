"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  // State for form data
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
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    countryOfOrigin: "",
    manufacturer: "",
    addressOfManufacturer: "",
    productCode: "",
    quantity: "",
    brand: "",
    categoryId: "",
  });

  // State for dropdown options
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mainCatRes, catRes, subCatRes] = await Promise.all([
          axios.get("http://localhost:3000/api/main-categories"),
          axios.get("http://localhost:3000/api/categories"),
          axios.get("http://localhost:3000/api/subcategories"),
        ]);
        setMainCategories(mainCatRes.data);
        setCategories(catRes.data);
        setSubCategories(subCatRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form submissions
  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/main-categories",
        mainCategory
      );
      alert("Main Category created!");
      setMainCategory({ name: "", description: "" });
      const res = await axios.get("http://localhost:3000/api/main-categories");
      setMainCategories(res.data);
    } catch (error) {
      alert("Error creating Main Category: " + error.response?.data?.error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/categories", category);
      alert("Category created!");
      setCategory({ name: "", description: "", mainCategoryId: "" });
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (error) {
      alert("Error creating Category: " + error.response?.data?.error);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/subcategories", subCategory);
      alert("SubCategory created!");
      setSubCategory({ name: "", description: "", categoryId: "" });
      const res = await axios.get("http://localhost:3000/api/subcategories");
      setSubCategories(res.data);
    } catch (error) {
      alert("Error creating SubCategory: " + error.response?.data?.error);
    }
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (index !== null) {
      // Handle shade image upload
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        // setFormData((prevData) => {
        //   const updatedShades = [...prevData.availableShades];
        //   updatedShades[index] = { ...updatedShades[index], image: imageUrl };
        //   return { ...prevData, availableShades: updatedShades };
        // });
      }
    } else {
      // Handle product image upload
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        // setFormData((prevData) => ({
        //   ...prevData,
        //   productImage: imageUrl,
        // }));
      }
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/products", {
        ...product,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
      });
      alert("Product created!");
      setProduct({
        name: "",
        price: "",
        description: "",
        countryOfOrigin: "",
        manufacturer: "",
        addressOfManufacturer: "",
        productCode: "",
        quantity: "",
        brand: "",
        categoryId: "",
      });
    } catch (error) {
      alert("Error creating Product: " + error.response?.data?.error);
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={mainCategory.description}
              onChange={(e) =>
                setMainCategory({
                  ...mainCategory,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
              {mainCategories.map((mc) => (
                <option key={mc._id} value={mc._id}>
                  {mc.name}
                </option>
              ))}
            </select>
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
        <h2 className="text-xl font-semibold mb-4">Create SubCategory</h2>
        <form onSubmit={handleSubCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
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
              Description
            </label>
            <textarea
              value={subCategory.description}
              onChange={(e) =>
                setSubCategory({ ...subCategory, description: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
              {categories.map((cat) => (
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
              Category Image
            </label>
            <input
              type="file"
              id="categoryImage"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create SubCategory
          </button>
        </form>
      </div>
    </div>
  );
}

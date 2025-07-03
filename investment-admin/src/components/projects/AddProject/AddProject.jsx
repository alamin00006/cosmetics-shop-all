"use client";
import TextEditor from "@/components/textEditor/TextEditor";
import { getBaseUrl } from "@/helpers/config/envConfig";
import {
  useGetProductCategoriesQuery,
  useGetProductMainCategoriesQuery,
  useGetProductSubCategoriesQuery,
} from "@/redux/api/productCategoryApi";
import { multipleImageUpload } from "@/utils/multipleImageUpload";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export default function ProductUploadForm() {
  const [aboutProduct, setAboutProduct] = useState("");
  const [multipleShades, setMultipleShades] = useState("");
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    currency: "BDT",
    availableShades: [{ name: "", color: "", image: null }],
    description: "",
    features: "",
    ingredients: "",
    countryOfOrigin: "",
    manufacturer: "",
    addressOfManufacturer: "",
    howToUse: "",
    shelfLife: "",
    productCode: "",
    quantity: "",
    mainCategoryId: "",
    categoryId: "",
    subCategoryId: "",
  });

  const {
    data: categories,
    error: projectGetError,
    isLoading,
    refetch: productCategoryRefetch,
  } = useGetProductCategoriesQuery();

  // Get Main Categories
  const {
    data: MainCategories,
    error: projectMainCategoriesError,
    isLoading: projectMainCategoryLoading,
    refetch: productMainCategoriesRefetch,
  } = useGetProductMainCategoriesQuery();

  // Get Sub Categories
  const {
    data: subCategories,
    error: subCategoriesError,
    isLoading: subCategoriesLoading,
    refetch: subCategoryRefetch,
  } = useGetProductSubCategoriesQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShadeChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedShades = [...prevData.availableShades];
      updatedShades[index] = { ...updatedShades[index], [field]: value };
      return { ...prevData, availableShades: updatedShades };
    });
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (index !== null) {
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        setFormData((prevData) => {
          const updatedShades = [...prevData.availableShades];
          updatedShades[index] = { ...updatedShades[index], image: imageUrl };
          return { ...prevData, availableShades: updatedShades };
        });
      }
    }
  };
  // Check File Size Check
  const checkFileSize = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size exceeds 5 MB. Please upload a smaller file.`);
      return false;
    }
    return true;
  };
  const handleFileChange = (setter) => (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(checkFileSize);

    if (validFiles.length > 0) {
      setter(validFiles);
    } else {
      e.target.value = "";
    }
  };

  const addShade = () => {
    setFormData((prevData) => ({
      ...prevData,
      availableShades: [
        ...prevData.availableShades,
        { name: "", color: "", image: null },
      ],
    }));
  };

  const removeShade = (index) => {
    setFormData((prevData) => {
      const updatedShades = prevData.availableShades.filter(
        (_, i) => i !== index
      );
      return { ...prevData, availableShades: updatedShades };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.quantity ||
      !formData.subCategoryId
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const submissionData = { ...formData, description: aboutProduct };

    // const allShadesValid = submissionData.availableShades.every(
    //   (shade) => shade.image
    // );

    // const productImagesValid =
    //   multipleShades === "No" ||
    //   submissionData.productImage.length > 0 ||
    //   (await multipleImageUpload(
    //     document.querySelector("input#productImage")?.files
    //   ));

    // if (!allShadesValid) {
    //   toast.error("Please upload images for all shades");
    //   return;
    // }

    // if (!productImagesValid) {
    //   toast.error("Please upload at least one product image");
    //   return;
    // }

    try {
      const productImageUrls = await multipleImageUpload(files);
      await axios.post(`${getBaseUrl()}/products`, {
        ...submissionData,
        productImage: productImageUrls?.map((img) => ({
          title: null,
          image: img,
        })),
      });
      toast.success("Product uploaded successfully!");
      setFormData({
        name: "",
        price: "",
        currency: "BDT",
        availableShades: [{ name: "", color: "", image: null }],
        description: "",
        features: "",
        ingredients: "",
        countryOfOrigin: "",
        manufacturer: "",
        addressOfManufacturer: "",
        howToUse: "",
        shelfLife: "",
        productCode: "",
        quantity: "",
        mainCategoryId: "",
        categoryId: "",
        subCategoryId: "",
      });
      setAboutProduct("");
      setMultipleShades("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during product upload";
      console.error("Product upload failed:", error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
              aria-label="Product Name"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
              aria-label="Price"
            />
          </div>
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Currency"
            >
              <option value="BDT">BDT</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="multipleShades"
              className="block text-sm font-medium text-gray-700"
            >
              Multiple Shades
            </label>
            <select
              id="multipleShades"
              value={multipleShades}
              onChange={(e) => setMultipleShades(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Multiple Shades"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
              min="0"
              aria-label="Quantity"
            />
          </div>
          <div>
            <label
              htmlFor="mainCategoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Main Category
            </label>
            <select
              id="mainCategoryId"
              name="mainCategoryId"
              value={formData.mainCategoryId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              aria-label="Category"
            >
              <option value="">Select main Category</option>
              {MainCategories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              aria-label="Category"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="subCategoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Sub Category
            </label>
            <select
              id="subCategoryId"
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              aria-label="Category"
            >
              <option value="">Select sub Category</option>
              {subCategories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {multipleShades === "Yes" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available Shades with Images
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {formData.availableShades.map((shade, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Shade Name
                      </label>
                      <input
                        type="text"
                        value={shade.name}
                        onChange={(e) =>
                          handleShadeChange(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter shade name"
                        aria-label={`Shade Name ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        type="text"
                        value={shade.color}
                        onChange={(e) =>
                          handleShadeChange(index, "color", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter color"
                        aria-label={`Shade Color ${index + 1}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        aria-label={`Shade Image ${index + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeShade(index)}
                      className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      disabled={formData.availableShades.length <= 1}
                      aria-label={`Remove Shade ${index + 1}`}
                    >
                      Remove Shade
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addShade}
                className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                aria-label="Add Shade"
              >
                Add Shade
              </button>
            </div>
          )}
          {multipleShades === "No" && (
            <div>
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                type="file"
                id="productImage"
                accept="image/*"
                multiple
                onChange={handleFileChange(setFiles)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                aria-label="Product Image"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="features"
              className="block text-sm font-medium text-gray-700"
            >
              Features
            </label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="3"
              aria-label="Features"
            />
          </div>
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="3"
              aria-label="Ingredients"
            />
          </div>
          <div>
            <label
              htmlFor="countryOfOrigin"
              className="block text-sm font-medium text-gray-700"
            >
              Country of Origin
            </label>
            <input
              type="text"
              id="countryOfOrigin"
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Country of Origin"
            />
          </div>
          <div>
            <label
              htmlFor="manufacturer"
              className="block text-sm font-medium text-gray-700"
            >
              Manufacturer
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Manufacturer"
            />
          </div>
          <div>
            <label
              htmlFor="addressOfManufacturer"
              className="block text-sm font-medium text-gray-700"
            >
              Address of Manufacturer
            </label>
            <textarea
              id="addressOfManufacturer"
              name="addressOfManufacturer"
              value={formData.addressOfManufacturer}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="2"
              aria-label="Address of Manufacturer"
            />
          </div>
          <div>
            <label
              htmlFor="howToUse"
              className="block text-sm font-medium text-gray-700"
            >
              How to Use
            </label>
            <textarea
              id="howToUse"
              name="howToUse"
              value={formData.howToUse}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="2"
              aria-label="How to Use"
            />
          </div>
          <div>
            <label
              htmlFor="shelfLife"
              className="block text-sm font-medium text-gray-700"
            >
              Shelf Life
            </label>
            <input
              type="text"
              id="shelfLife"
              name="shelfLife"
              value={formData.shelfLife}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Shelf Life"
            />
          </div>
          <div>
            <label
              htmlFor="productCode"
              className="block text-sm font-medium text-gray-700"
            >
              Product Code
            </label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              aria-label="Product Code"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <TextEditor
              setEditorValue={setAboutProduct}
              editorValue={aboutProduct}
              aria-label="Description"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          aria-label="Upload Product"
        >
          Upload Product
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

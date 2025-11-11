"use client";
import LoadingState from "@/components/LoadingState/LoadingState";
import TextEditor from "@/components/textEditor/TextEditor";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetBrandsQuery } from "@/redux/api/brandApi";
import {
  useGetProductCategoriesQuery,
  useGetProductMainCategoriesQuery,
  useGetProductSubCategoriesQuery,
} from "@/redux/api/productCategoryApi";
import { customColor } from "@/utils/customColor";
import { multipleImageUpload } from "@/utils/multipleImageUpload";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";
import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ProductUploadForm() {
  const [isUploadLoading, setIsUploading] = useState(false);
  const [aboutProduct, setAboutProduct] = useState("");
  const [multipleShades, setMultipleShades] = useState("");
  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    currency: "BDT",
    availableShades: [{ name: "", color: "", image: null }],
    description: "",

    ingredients: "",
    countryOfOrigin: "",

    howToUse: "",
    shelfLife: "",
    productCode: "",
    quantity: "",
    brand: "",
    mainCategoryId: "",
    categoryId: "",
    subCategoryId: "",
    productType: "",
  });

  // get Brands
  const {
    data: brands,
    error: brandGetError,
    isLoading: brandGetLoading,
    refetch,
  } = useGetBrandsQuery();

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
      setIsUploading(true);
      const productImageUrls = await multipleImageUpload(files);
      await axios.post(`${getBaseUrl()}/products`, {
        ...submissionData,
        productImage: productImageUrls?.map((img) => ({
          title: null,
          image: img,
        })),
      });
      toast.success("Product uploaded successfully!");
      // setFormData({
      //   name: "",
      //   price: "",
      //   discount: "",
      //   currency: "BDT",
      //   availableShades: [{ name: "", color: "", image: null }],
      //   description: "",
      //   ingredients: "",
      //   countryOfOrigin: "",

      //   howToUse: "",
      //   shelfLife: "",
      //   productCode: "",
      //   quantity: "",
      //   brand: "",
      //   mainCategoryId: "",
      //   categoryId: "",
      //   subCategoryId: "",
      //   productType: "",
      // });
      // setAboutProduct("");
      // setMultipleShades("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during product upload";
      console.error("Product upload failed:", error);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <LoadingState isLoadingState={isUploadLoading} />

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
                placeholder="Product Name"
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
                placeholder="Price"
              />
            </div>
            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700"
              >
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
                placeholder="Discount"
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
                placeholder="Currency"
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
                placeholder="Multiple Shades"
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
                placeholder="Quantity"
              />
            </div>
            <div>
              <label
                htmlFor="mainCategoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                placeholder="Category"
              >
                <option value="">Select Brand</option>
                {brands?.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
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
                placeholder="Category"
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
                placeholder="Category"
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
                placeholder="Category"
              >
                <option value="">Select sub Category</option>
                {subCategories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="productType"
                className="block text-sm font-medium text-gray-700"
              >
                Product Type
              </label>
              <select
                id="productType"
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                placeholder="productType"
              >
                <option value="">Select Product Type</option>

                <option>Regular</option>
                <option>New Arrival</option>
                <option>Best Seller</option>
                <option>Combo</option>
                <option>Gift</option>
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
                          id={`shade-color-${index}`}
                          value={shade.color}
                          // disabled
                          onChange={(e) =>
                            handleShadeChange(index, "color", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter color (e.g., #FF0000)"
                          aria-label={`Shade Color ${index + 1}`}
                        />

                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          {customColor.map(({ value, style }, i) => (
                            <label
                              key={i}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={`color-${index}`}
                                value={value}
                                checked={shade.color === value}
                                onChange={(e) =>
                                  handleShadeChange(
                                    index,
                                    "color",
                                    e.target.value
                                  )
                                }
                                className="sr-only"
                                placeholder={`Select color ${value}`}
                              />
                              <span
                                className={`w-6 h-6 rounded-full border-2 ${
                                  shade.color === value
                                    ? "border-indigo-500 ring-2 ring-indigo-500"
                                    : "border-transparent"
                                }`}
                                style={style}
                              ></span>
                            </label>
                          ))}
                        </div>
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
                          placeholder={`Shade Image ${index + 1}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeShade(index)}
                        className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                        disabled={formData.availableShades.length <= 1}
                        placeholder={`Remove Shade ${index + 1}`}
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
                  placeholder="Add Shade"
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
                  placeholder="Product Image"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Country of Origin"
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
                placeholder="Product Code"
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
                placeholder="Ingredients"
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
                rows="3"
                placeholder="How to Use"
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
                placeholder="Description"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            placeholder="Upload Product"
          >
            Upload Product
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

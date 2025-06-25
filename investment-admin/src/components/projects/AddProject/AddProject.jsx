"use client";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { imgBbApi } from "@/utils/imgBbApi";
import { isValidPhoto } from "@/utils/isValidPhoto";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductUploadForm() {
  const [formData, setFormData] = useState({
    name: "Revolution Pout Lip Oil",
    price: "",
    currency: "BDT",
    pointsEarned: "",
    shade: "",
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
    productImage: null,
  });

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
      // Handle shade image upload
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        setFormData((prevData) => {
          const updatedShades = [...prevData.availableShades];
          updatedShades[index] = { ...updatedShades[index], image: imageUrl };
          return { ...prevData, availableShades: updatedShades };
        });
      }
    } else {
      // Handle product image upload
      const imageUrl = await uploadImageToImgBB(file);
      if (imageUrl) {
        setFormData((prevData) => ({
          ...prevData,
          productImage: imageUrl,
        }));
      }
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
    console.log(formData);
    // Prepare data for submission (no FormData needed for API since images are URLs)
    const submissionData = { ...formData };

    // Ensure all images are uploaded before submission
    const allImagesUploaded = await Promise.all(
      formData.availableShades.map(async (shade, index) => {
        if (shade.image === null && formData.availableShades.length > 1) {
          const fileInput = document.querySelector(
            `input[type="file"]:nth-of-type(${index + 1})`
          );
          if (fileInput && fileInput.files[0]) {
            const imageUrl = await uploadImageToImgBB(fileInput.files[0]);
            if (imageUrl) {
              submissionData.availableShades[index].image = imageUrl;
            } else {
              return false;
            }
          }
        }
        return true;
      })
    );

    if (
      formData.productImage === null &&
      !formData.availableShades.some((s) => s.image) &&
      document.querySelector("input#productImage")?.files[0]
    ) {
      const imageUrl = await uploadImageToImgBB(
        document.querySelector("input#productImage").files[0]
      );
      if (imageUrl) {
        submissionData.productImage = imageUrl;
      } else {
        return;
      }
    }

    if (allImagesUploaded.every(Boolean)) {
      try {
        await axios.post(`${getBaseUrl()}/products`, submissionData);

        // const response = await fetch("/api/products", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(submissionData),
        // });

        toast.success("Product uploaded successfully!");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred during product upload");
      }
    } else {
      toast.error("Please ensure all images are uploaded successfully");
    }
  };

  const hasMultipleShades = true;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
              readOnly
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
            >
              <option value="BDT">BDT</option>
              <option value="PKR">PKR</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="pointsEarned"
              className="block text-sm font-medium text-gray-700"
            >
              Points Earned
            </label>
            <input
              type="number"
              id="pointsEarned"
              name="pointsEarned"
              value={formData.pointsEarned}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="shade"
              className="block text-sm font-medium text-gray-700"
            >
              Shade
            </label>
            <input
              type="text"
              id="shade"
              name="shade"
              value={formData.shade}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
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
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {hasMultipleShades ? (
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
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeShade(index)}
                      className="mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      disabled={formData.availableShades.length <= 1}
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
              >
                Add Shade
              </button>
            </div>
          ) : (
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
                onChange={(e) => handleImageChange(e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              rows="3"
            />
          </div>
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
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export const uploadImageToImgBB = async (file) => {
  // Check file size (5MB limit)
  if (file.size > 5000000) {
    toast.error("Picture size exceeds 5MB, upload not allowed");
    return null;
  }
  // Validate check
  if (!isValidPhoto(file)) {
    toast.error("Product picture is not valid");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=${imgBbApi}`;

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const imgData = await response.json();

    if (imgData.success) {
      const imageUrl = imgData.data.url;
      toast.success("Image uploaded successfully!");
      return imageUrl;
    } else {
      toast.error("Failed to upload image");
      return null;
    }
  } catch (error) {
    toast.error("An error occurred during image upload");
    return null;
  }
};

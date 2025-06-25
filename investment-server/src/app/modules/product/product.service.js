import Product from "./product.model.js";

// Create Project
const createProduct = async (productData) => {
  const project = new Product({
    ...productData,
  });

  const projectUpload = await project.save();
  return projectUpload;
};

const getAllProducts = async (userId) => {
  const getAllProducts = await Product.find({ userId });

  return getAllProducts;
};

const getProductDetails = async (id) => {
  const bankAccount = await Product.findOne({ _id: id });
  return bankAccount;
};

const updateProduct = async (productId, productData) => {
  const bankAccount = await Product.updateOne(
    { _id: productId },
    {
      $set: {
        ...productData,
      },
    }
  );
  return bankAccount;
};
export const ProductService = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};

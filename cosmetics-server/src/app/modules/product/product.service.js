import httpStatus from "http-status";
import ApiError from "../../../error/ApiError.js";
import Product from "./product.model.js";

// Create Project
const createProduct = async (productData) => {
  const project = new Product({
    ...productData,
  });

  const projectUpload = await project.save();
  return projectUpload;
};

const getAllProducts = async () => {
  const getAllProducts = await Product.find({}).populate(
    "mainCategoryId subCategoryId brand"
  );
  if (!getAllProducts) {
    throw new ApiError(httpStatus.NOT_FOUND, "No products found");
  }

  return getAllProducts;
};

const getProductDetails = async (id) => {
  const product = await Product.findOne({ _id: id }).populate(
    "mainCategoryId subCategoryId brand"
  );
  return product;
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

// # NODE_ENV=development
// NODE_ENV=production

// # DATABASE_URL=mongodb+srv://sharikanainvest:Websharikana08@sharikana.9qtny.mongodb.net/sharikanaDB?retryWrites=true&w=majority
// # DATABASE_URL=mongodb://localhost:27017/sharikanaDB
// DATABASE_URL=mongodb+srv://booktarikul:x8GxyDDhz6QOyn0e@cluster0.scp6egc.mongodb.net/cosmeticsDB?retryWrites=true&w=majority

// ACCESS_TOKEN_SECRET=e911b71e4c47b5f4ab605ffbfbfb4782616ee9b2c592c386f45691ee26c53e8f99cb4f4d208bc9851b48f38b7126f8bf4dd9fcc061bf7f0dc7498fe119b7298b

// REFRESH_TOKEN_SECRET="our-secret"
// PORT=5000

// BCRYPT_SALT_ROUNDS=12

// # JWT_EXPIRES_IN=1d
// JWT_EXPIRES_IN=365d
// # JWT_EXPIRES_IN=5m

// JWT_REFRESH_EXPIRES_IN=365d

// SMS_API_KEY_VALUE=BquVEb4LSFdJjB5hzEWw
// SMS_SENDER_ID=8809617623298
// SMS_API_HOST_SITE=bulksmsbd.net

// secretKey=go-to-sharikana08$@&&sha25601235
// API_KEY=sharikana_0120!!05

// NODE_MAILER_AUTH_USER_EMAIL=sharikana.invest@gmail.com
// NODE_MAILER_AUTH_USER_PASS=cwvezmshjstxanmm

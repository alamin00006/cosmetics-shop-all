import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { ProductService } from "./product.service.js";

const createProduct = catchAsync(async (req, res) => {
  const { ...projectData } = req.body;

  console.log(projectData);

  const projectUpload = await ProductService.createProduct(projectData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Upload Successfully",
    data: projectUpload,
  });
});

const getProductDetails = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const project = await ProductService.getProductDetails(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: project,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const project = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product Get successfully",
    data: project,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductDetails,
};

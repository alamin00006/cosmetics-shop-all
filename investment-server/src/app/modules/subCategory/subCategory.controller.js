import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { SubCategoryService } from "./subCategory.service.js";

const createSubCategory = catchAsync(async (req, res) => {
  const subCategoryData = req.body;
  await SubCategoryService.createSubCategory(subCategoryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Added",
  });
});

const getSubCategories = catchAsync(async (req, res) => {
  const subCategories = await SubCategoryService.getSubCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SubCategory get Success",
    data: subCategories,
  });
});

const updateSubCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { ...updateData } = req.body;

  await SubCategoryService.updateSubCategory(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SubCategory Updated",
  });
});
const getSubCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const subCategory = await SubCategoryService.getSubCategoryById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SubCategory fetched successfully",
    data: subCategory,
  });
});
const deleteSubCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  await SubCategoryService.deleteSubCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "SubCategory deleted successfully",
  });
});

export const SubCategoryController = {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
};

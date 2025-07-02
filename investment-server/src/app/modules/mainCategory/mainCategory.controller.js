import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";

import { MainCategoryService } from "./mainCategory.service.js";

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body;
  await MainCategoryService.createCategory(categoryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Added",
  });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await MainCategoryService.getCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category get Success",
    data: categories,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { ...updateData } = req.body;

  await MainCategoryService.updateCategory(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category Updated",
  });
});

export const mainCategoryController = {
  createCategory,
  getCategories,
  updateCategory,
};

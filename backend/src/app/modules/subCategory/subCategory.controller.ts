import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SubCategoryService } from './subCategory.service'

import { ISubCategory } from './subCategory.interface'

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const subCategoryData = req.body as Partial<ISubCategory>
  await SubCategoryService.createSubCategory(subCategoryData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Added',
  })
})

const getSubCategories = catchAsync(async (req: Request, res: Response) => {
  const subCategories = await SubCategoryService.getSubCategories()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory get Success',
    data: subCategories,
  })
})

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const updateData = req.body as Partial<ISubCategory>

  await SubCategoryService.updateSubCategory(id, updateData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory Updated',
  })
})

const getSubCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const subCategory = await SubCategoryService.getSubCategoryById(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory fetched successfully',
    data: subCategory,
  })
})

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  await SubCategoryService.deleteSubCategory(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory deleted successfully',
  })
})

export const SubCategoryController = {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
}

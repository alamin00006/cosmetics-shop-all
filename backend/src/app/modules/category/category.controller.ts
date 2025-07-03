import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CategoryService } from './category.service'

const createCategory = catchAsync(async (req, res) => {
  const categoryData = req.body
  await CategoryService.createCategory(categoryData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Added',
  })
})

const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategories()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category get Success',
    data: categories,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id
  const { ...updateData } = req.body

  await CategoryService.updateCategory(id, updateData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated',
  })
})

export const CategoryController = {
  createCategory,
  getCategories,
  updateCategory,
}

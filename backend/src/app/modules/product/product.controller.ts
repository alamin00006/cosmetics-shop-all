import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

import { ProductService } from './product.service'
import { IProduct } from './product.interface'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...projectData } = req.body as IProduct

  console.log(projectData)

  const projectUpload = await ProductService.createProduct(projectData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Upload Successfully',
    data: projectUpload,
  })
})

const getProductDetails = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id as string
  const project = await ProductService.getProductDetails(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Get successfully',
    data: project,
  })
})

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const project = await ProductService.getAllProducts()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Get successfully',
    data: project,
  })
})

export const ProductController = {
  createProduct,
  getProductDetails,
  getAllProducts,
}

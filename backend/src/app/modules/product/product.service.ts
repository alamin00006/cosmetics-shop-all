import { Types } from 'mongoose'

import { IProduct } from './product.interface'

import Product from './product.model'

const createProduct = async (
  productData: Partial<IProduct>,
): Promise<IProduct> => {
  const project = new Product({
    ...productData,
  })

  const projectUpload = await project.save()
  return projectUpload
}

const getAllProducts = async (): Promise<IProduct[]> => {
  const getAllProducts = await Product.find({})
  return getAllProducts
}

const getProductDetails = async (id: string): Promise<IProduct | null> => {
  const bankAccount = await Product.findOne({ _id: id })
  return bankAccount
}

const updateProduct = async (
  productId: string,
  productData: Partial<IProduct>,
): Promise<{ matchedCount: number, modifiedCount: number }> => {
  const bankAccount = await Product.updateOne(
    { _id: productId },
    {
      $set: {
        ...productData,
      },
    },
  )
  return bankAccount
}

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
}

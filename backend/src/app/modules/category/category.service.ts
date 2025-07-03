import { ICategory } from './category.interface'
import Category from './category.model'

export const createCategory = async (
  categoryData: Partial<ICategory>,
): Promise<ICategory> => {
  const category = new Category(categoryData)
  const result = await category.save()
  return result
}

export const getCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.find({})
  return categories
}

export const updateCategory = async (
  id: string,
  updateData: Partial<ICategory>,
): Promise<{ matchedCount: number, modifiedCount: number }> => {
  const result = await Category.updateOne(
    { _id: id },
    {
      $set: updateData,
    },
  )
  return result
}

export const CategoryService = {
  createCategory,
  getCategories,
  updateCategory,
}

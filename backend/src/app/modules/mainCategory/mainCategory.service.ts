import { IMainCategory } from './mainCategory.interface'
import MainCategory from './mainCategory.model.js'

export const createCategory = async (
  categoryData: Partial<IMainCategory>,
): Promise<IMainCategory> => {
  const category = new MainCategory(categoryData)
  const result = await category.save()
  return result
}

export const getCategories = async (): Promise<IMainCategory[]> => {
  const categories = await MainCategory.find({})
  return categories
}

export const updateCategory = async (
  id: string,
  updateData: Partial<IMainCategory>,
): Promise<{ matchedCount: number, modifiedCount: number }> => {
  const result = await MainCategory.updateOne(
    { _id: id },
    {
      $set: updateData,
    },
  )
  return result
}

export const MainCategoryService = {
  createCategory,
  getCategories,
  updateCategory,
}

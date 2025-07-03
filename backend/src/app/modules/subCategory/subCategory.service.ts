import { ISubCategory } from './subCategory.interface'
import SubCategory from './subCategory.model'

export const createSubCategory = async (
  subCategoryData: Partial<ISubCategory>,
): Promise<ISubCategory> => {
  const subCategory = new SubCategory(subCategoryData)
  const result = await subCategory.save()
  return result
}

export const getSubCategories = async (): Promise<ISubCategory[]> => {
  const subCategories = await SubCategory.find({})
  return subCategories
}

export const updateSubCategory = async (
  id: string,
  updateData: Partial<ISubCategory>,
): Promise<{ matchedCount: number, modifiedCount: number }> => {
  const result = await SubCategory.updateOne(
    { _id: id },
    {
      $set: updateData,
    },
  )
  return result
}

export const getSubCategoryById = async (
  id: string,
): Promise<ISubCategory | null> => {
  const subCategory = await SubCategory.findById(id).populate('categoryId')
  return subCategory
}

export const deleteSubCategory = async (
  id: string,
): Promise<{ deletedCount: number }> => {
  const result = await SubCategory.deleteOne({ _id: id })
  return result
}

export const SubCategoryService = {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
}

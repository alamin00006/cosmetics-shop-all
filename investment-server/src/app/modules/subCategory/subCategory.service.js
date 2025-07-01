import SubCategory from "./subCategory.model.js";

export const createSubCategory = async (subCategoryData) => {
  const subCategory = new SubCategory(subCategoryData);
  const result = await subCategory.save();
  return result;
};
export const getSubCategories = async () => {
  const subCategories = await SubCategory.find({}).populate("categoryId");
  return subCategories;
};
export const updateSubCategory = async (id, updateData) => {
  await SubCategory.updateOne(
    { _id: id },
    {
      $set: updateData,
    }
  );
};

export const getSubCategoryById = async (id) => {
  const subCategory = await SubCategory.findById(id).populate("categoryId");
  return subCategory;
};
export const deleteSubCategory = async (id) => {
  await SubCategory.deleteOne({ _id: id });
};

export const SubCategoryService = {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
};

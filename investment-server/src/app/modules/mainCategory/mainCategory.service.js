import MainCategory from "./mainCategory.model.js";

export const createCategory = async (categoryData) => {
  const category = new MainCategory(categoryData);
  const result = await category.save();
  return result;
};

export const getCategories = async () => {
  const categories = await MainCategory.find({});
  return categories;
};

export const updateCategory = async (id, updateData) => {
  await MainCategory.updateOne(
    { _id: id },
    {
      $set: updateData,
    }
  );
};

export const MainCategoryService = {
  createCategory,
  getCategories,
  updateCategory,
};

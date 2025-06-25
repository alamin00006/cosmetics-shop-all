import Category from "./category.model.js";

export const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  const result = await category.save();
  return result;
};

export const getCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

export const updateCategory = async (id, updateData) => {
  await Category.updateOne(
    { _id: id },
    {
      $set: updateData,
    }
  );
};

export const updateCategoryIndex = async (updateData) => {
  const operations = updateData.map((item, index) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $set: { index } }, // backend assigns the index
    },
  }));

  await Category.bulkWrite(operations);
};

export const CategoryService = {
  createCategory,
  getCategories,
  updateCategory,
  updateCategoryIndex,
};

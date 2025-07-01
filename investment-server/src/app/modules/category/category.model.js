import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true }, // e.g., "Face Care"
  description: { type: String },
  mainCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true,
  }, // References MainCategory
  subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }], // References SubCategory collection
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;

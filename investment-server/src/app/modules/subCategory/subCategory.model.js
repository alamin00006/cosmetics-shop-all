import mongoose from "mongoose";

const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  name: { type: String, required: true }, // e.g., "Cleanser"
  description: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // References Category
  image: {
    type: String, // Stores ImgBB URL for the subcategory image
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;

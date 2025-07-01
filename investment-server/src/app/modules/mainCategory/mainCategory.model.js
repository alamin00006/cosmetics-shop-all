import mongoose from "mongoose";

const { Schema } = mongoose;

const MainCategorySchema = new Schema({
  name: { type: String, required: true }, // e.g., "Skin"
  description: { type: String },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }], // References Category collection
});

const MainCategory = mongoose.model("MainCategory", MainCategorySchema);
export default MainCategory;

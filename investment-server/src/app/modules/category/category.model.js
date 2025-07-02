import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      enum: ["Must be unique name"],
      required: true,
    }, // e.g., "Face Care"
    description: { type: String },
    mainCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "MainCategory",
      required: true,
    }, // References MainCategory

    image: {
      type: String,
      // required: true,
    },
    // subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;

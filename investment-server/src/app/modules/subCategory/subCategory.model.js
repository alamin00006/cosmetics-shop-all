import mongoose from "mongoose";

const { Schema } = mongoose;

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    }, // e.g., "Cleanser"
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;

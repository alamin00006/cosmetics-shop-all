import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      required: [true, "Please Provide Brand Name"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

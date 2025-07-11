import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Brand Name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      // required: [true, "Please Provide Brand Description"],
    },
    image: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;

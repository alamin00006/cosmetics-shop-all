import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const ReviewSchema = new mongoose.Schema(
  {
    forProduct: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["Approved", "Unapproved"],
      },
      default: "Unapproved",
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;

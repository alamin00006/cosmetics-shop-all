import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const PrManagerSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    additionalPhoneNumber: {
      type: String,
    },
    additionalName: {
      type: String,
    },
    name: {
      type: String,
    },
    incentive: {
      type: Number,
    },
    refferCode: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      type: String,
    },
    userPhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Model
const PRManager = mongoose.model("PRManager", PrManagerSchema);

export default PRManager;

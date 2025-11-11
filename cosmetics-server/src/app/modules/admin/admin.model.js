import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema.Types;

// Schema Design
const adminSchema = mongoose.Schema(
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
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserOtp = mongoose.model("UserOtp", otpSchema);

export default UserOtp;

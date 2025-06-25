import UserOtp from "./userOtp.model.js";

export const createOtp = async (otpData) => {
  const otp = new UserOtp(otpData);
  const result = await otp.save();
  return result;
};
export const getOtp = async (otpData) => {
  const otp = UserOtp.findOne(otpData).sort({ createdAt: -1 });
  return otp;
};

export const deleteOtp = async (otpData) => {
  await UserOtp.deleteOne(otpData);
};

export const OtpServices = {
  createOtp,
  getOtp,
  deleteOtp,
};

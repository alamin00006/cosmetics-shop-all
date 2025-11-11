import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { OtpServices } from "./userOtp.service.js";

const createOtp = catchAsync(async (req, res) => {
  const otpData = req.body;
  await OtpServices.createOtp(otpData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Send",
  });
});

const getOtp = catchAsync(async (req, res) => {
  const otp = await OtpServices.getOtp();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Otp get Success",
    data: otp,
  });
});
const deleteOtp = catchAsync(async (req, res) => {
  const otpData = req.body;
  await OtpServices.deleteOtp(otpData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Otp delete Success",
  });
});

export const OtpController = {
  createOtp,
  getOtp,
  deleteOtp,
};

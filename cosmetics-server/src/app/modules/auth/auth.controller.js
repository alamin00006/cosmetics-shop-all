import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { AuthService } from "./auth.service.js";

const sendOtp = catchAsync(async (req, res) => {
  const userData = req.body;

  await AuthService.sendOtp(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Please check your Phone or Email",
    // data: others,
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const userData = req.body;
  const isVerify = await AuthService.verifyOtp(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Verified",
    data: isVerify,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const userData = req.body;

  await AuthService.resetPassword(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully Updated Your Password",
    // data: others,
  });
});

export const AuthController = {
  sendOtp,
  verifyOtp,
  resetPassword,
};

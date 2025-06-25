import User from "./user.model.js";
import "dotenv/config";
import { userService } from "./user.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

import config from "../../../config/index.js";

import { encrypt } from "../../../helpers/encrypt.js";

// Create User
const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  // create new user
  const result = await userService.createUser(user);

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    });
  }

  // Send success response

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully created account!",
    data: others,
  });
});

// Send OTP User Phone
const sendOtp = catchAsync(async (req, res, next) => {
  const userData = req.body;
  await userService.sendOtp(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Please Check Your Phone Or Email",
  });
});

const createLogin = catchAsync(async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Call the login service
  const result = await userService.createLogin(phoneNumber, password);

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged in successfully",
    data: others,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await userService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});

const getUserByPhone = catchAsync(async (req, res) => {
  const phoneNumber = req?.user?.phoneNumber;
  const userData = await userService.getUserByPhone(phoneNumber);
  const encryptedData = encrypt(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get Success",
    data: encryptedData,
  });
});
const getUserById = catchAsync(async (req, res) => {
  const userId = req?.query?.userId;
  const userData = await userService.getUserById(userId);
  const encryptedData = encrypt(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get Success",
    data: encryptedData,
  });
});

// const getAllUsers = catchAsync(async (req, res) => {
//   const query = req.query;
//   const result = await userService.getAllUsers(query);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "User get successfully",
//     data: result,
//   });
// });
const getAllUsersCount = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersCount();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

// const updateUser = catchAsync(async (req, res) => {
//   console.log(req?.files);

//   const files = req?.files;

//   const userId = req.params.userId;
//   const updateUserData = req.body;
//   // console.log(updateUserData);
//   await userService.updateUser(userId, updateUserData, files);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Successfully Updated",
//   });
// });

// Update Status
const updateUserStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  await userService.updateUserStatus(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated",
  });
});

export const UsersController = {
  createLogin,
  createUser,
  refreshToken,
  // getAllUsers,
  getUserByPhone,
  // updateUser,
  sendOtp,
  getAllUsersCount,
  getUserById,
  updateUserStatus,
};

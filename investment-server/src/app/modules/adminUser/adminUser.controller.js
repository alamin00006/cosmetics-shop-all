import { adminUserService } from "./adminUser.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import config from "../../../config/index.js";

const createAdminUser = catchAsync(async (req, res) => {
  const { email, password, role, company = null, ...userOthersData } = req.body;

  // user data for AdminUser
  const userData = {
    email,
    password,
    role,
    company,
  };

  // create new user
  const result = await adminUserService.createAdminUser(
    userOthersData,
    userData
  );

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    });
  }

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const updateAdminUser = catchAsync(async (req, res) => {
  const { email, password, role, company = null, ...userOthersData } = req.body;

  const userId = req.params.id;

  // user data for AdminUser
  const userData = {
    email,
    password,
    role,
    company,
  };

  // create new user
  const result = await adminUserService.updateAdminUser(
    userOthersData,
    userId,
    userData
  );

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    });
  }

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});
const updateAdminUserOnlyPassword = catchAsync(async (req, res) => {
  const { ...userPassword } = req.body;

  const userId = req.params.id;

  // create new user
  const result = await adminUserService.updateAdminUserOnlyPassword(
    userId,
    userPassword
  );

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    });
  }

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

// Update Only Profile Photo admin user

const updateProfilePhoto = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const adminUsers = await adminUserService.updateProfilePhoto(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated",
    data: adminUsers,
  });
});
// Update Status
const updateUserStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  await adminUserService.updateUserStatus(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated",
  });
});

const createLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Call the login service
  const result = await adminUserService.createLogin(email, password);

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

  const result = await adminUserService.refreshToken(refreshToken);

  // set refresh token into cookie

  // const cookieOptions = {
  //   secure: config.env === "production",
  //   httpOnly: true,
  // };

  // res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const email = req?.user?.email;

  // Call the service function
  const adminUserData = await adminUserService.getAdminUserByEmail(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get Success",
    data: adminUserData,
  });
});

const allAdminUser = catchAsync(async (req, res) => {
  const params = req?.query;
  // Call the service function to get all admin users
  const adminUsers = await adminUserService.getAllAdminUsers(params);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get Success",
    data: adminUsers,
  });
});

export const AdminUsersController = {
  createAdminUser,
  createLogin,
  refreshToken,
  getMe,
  allAdminUser,
  updateAdminUser,
  updateAdminUserOnlyPassword,
  updateProfilePhoto,
  updateUserStatus,
};

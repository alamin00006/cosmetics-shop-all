import AdminUser from "./adminUser.model.js";
import mongoose from "mongoose";
import { generateAdminUserId } from "./adminUser.utils.js";

import SuperAdmin from "../superAdmin/superAdmin.model.js";
import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import config from "../../../config/index.js";
import httpStatus from "http-status";
import ApiError from "../../../error/ApiError.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import bcrypt from "bcryptjs";
import Admin from "../admin/admin.model.js";

const createAdminUser = async (adminUserData, user) => {
  // Check exists email
  const findUser = await AdminUser.findOne({ email: user.email });
  if (findUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Sorry! An account already exists with this email."
    );
  }

  const session = await mongoose.startSession();
  let newUserAllData = null;

  try {
    session.startTransaction();

    // Generate a new Admin ID
    const id = await generateAdminUserId();
    user.id = id;

    const newAdminUserData = {
      id,
      ...adminUserData,
    };

    // Create a new PRManager or SuperAdmin based on role
    let newAdminUser;
    if (user?.role === "SuperAdmin") {
      newAdminUser = await SuperAdmin.create([newAdminUserData], { session });
    }
    if (user?.role === "admin") {
      newAdminUser = await Admin.create([newAdminUserData], { session });
    }

    if (!newAdminUser.length) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        "Failed to create PRManager or SuperAdmin or Admin"
      );
    }

    // role based user create
    if (user?.role === "SuperAdmin") {
      user.SuperAdmin = newAdminUser[0]._id;
    }
    if (user?.role === "admin") {
      user.admin = newAdminUser[0]._id;
    }

    // Create a new AdminUser
    const newUser = await AdminUser.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.FORBIDDEN, "Failed to create AdminUser.");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }

  return newUserAllData;
};

// Update admin user
const updateAdminUser = async (userOthersData, userId, user) => {
  // Check if the user exists
  const existingUser = await AdminUser.findById(userId);
  if (!existingUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Sorry! No account found with this ID."
    );
  }

  const session = await mongoose.startSession();
  let updatedUserAllData = null;

  try {
    session.startTransaction();

    // update password only if provided
    let updateUserData = { ...user };
    if (user.password) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
      );
      updateUserData.password = hashedPassword;
    }

    // Update AdminUser data
    const updatedUser = await AdminUser.findByIdAndUpdate(
      userId,
      { $set: updateUserData },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update AdminUser."
      );
    }

    // Role-based update
    if (user?.role === ENUM_USER_ROLE.SUPER_ADMIN) {
      const updatedSuperAdmin = await SuperAdmin.findByIdAndUpdate(
        existingUser.SuperAdmin,
        userOthersData,
        { new: true, session }
      );

      if (!updatedSuperAdmin) {
        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update SuperAdmin."
        );
      }
    }

    updatedUserAllData = updatedUser;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  } finally {
    session.endSession();
  }

  return updatedUserAllData;
};

const updateAdminUserOnlyPassword = async (userId, userPassword) => {
  // Check if the user exists
  const existingUser = await AdminUser.findById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Sorry! No account found.");
  }

  // Check if oldPassword and newPassword are provided
  let updatedUser;
  if (userPassword.oldPassword && userPassword.password) {
    // Compare the old password
    const passwordMatch = await bcrypt.compare(
      userPassword.oldPassword,
      existingUser.password
    );

    if (!passwordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Old password is incorrect.");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      userPassword.password,
      Number(config.bcrypt_salt_rounds)
    );

    // Save the updated user
    updatedUser = await AdminUser.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Both old and new passwords are required."
    );
  }

  if (!updatedUser) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update user."
    );
  }

  return updatedUser;
};

const updateUserStatus = async (id, updatedData) => {
  await AdminUser.updateOne(
    { _id: id },
    {
      $set: {
        ...updatedData,
      },
    }
  );
};

// Update Only Profile Photo admin user

const updateProfilePhoto = async (id, updateData) => {
  const { role, profilePhoto } = updateData;

  let updateUser;

  if (role === ENUM_USER_ROLE.SUPER_ADMIN) {
    updateUser = await SuperAdmin.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          userPhoto: profilePhoto,
        },
      }
    );
  }

  return updateUser;
};

const createLogin = async (email, password) => {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const adminUser = await AdminUser.findOne({ email });
  if (!adminUser) {
    throw new Error("No account found with this email");
  }

  const unauthorizedStatuses = ["Blocked", "Deactive"];

  if (unauthorizedStatuses.includes(adminUser.status)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Your account is blocked or deactivated. Please contact support."
    );
  }

  const isValidPassword = await adminUser.comparePassword(password);
  if (!isValidPassword) {
    throw new Error("Wrong password");
  }

  const token = jwtHelpers.generateTokenForAdminUsers(adminUser);
  const refreshToken = jwtHelpers.generateRefreshTokenForAdminUsers(adminUser);
  const { password: pwd, ...others } = adminUser.toObject();

  return { adminUser: others, token, refreshToken };
};

const refreshToken = async (token) => {
  //verify token

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (err) {
    throw new Error(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await AdminUser.isUserExist(userId);
  if (!isUserExist) {
    throw new Error(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.generateTokenForAdminUsers(isUserExist);

  return {
    accessToken: newAccessToken,
  };
};

const getAdminUserByEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const adminUser = await AdminUser.findOne({ email }).populate(
    "PRManager company SuperAdmin"
  );
  if (!adminUser) {
    throw new Error("No account found with this email");
  }

  const { password: pwd, ...others } = adminUser.toObject();
  return others;
};

const getAllAdminUsers = async (params) => {
  const { role, company, excludeRole } = params;

  let query = {};

  if (role) query["role"] = role;
  if (company) query["company"] = company;

  if (excludeRole && Array.isArray(excludeRole)) {
    query["role"] = { $nin: excludeRole };
  }
  const prManager = await AdminUser.find(query)
    .populate("PRManager company SuperAdmin admin")
    .sort({ createdAt: -1 });

  return prManager;
};

export const adminUserService = {
  createAdminUser,
  createLogin,
  refreshToken,
  getAdminUserByEmail,
  getAllAdminUsers,
  updateAdminUser,
  updateAdminUserOnlyPassword,
  updateProfilePhoto,
  updateUserStatus,
};

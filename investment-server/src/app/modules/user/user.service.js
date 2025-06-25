import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import User from "./user.model.js";
import { generateUserId } from "./user.utils.js";
import config from "../../../config/index.js";
import ApiError from "../../../error/ApiError.js";

// import fs from "fs";
// import path from "path";
import nodemailer from "nodemailer";
import { otpSendSms2 } from "../../../SMS/otpSms2.js";
import { otpMail } from "../../../mail/sendToOtpMail.js";

import { OtpServices } from "../userOtp/userOtp.service.js";
const createUser = async (user) => {
  const email = user?.email;
  const phoneNumber = user?.phoneNumber;
  const findUser = await User.findOne({ email });
  const findUserWithPhone = await User.findOne({ phoneNumber });
  // check user already exist
  if (findUser || findUserWithPhone) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Sorry! Already Account Created with this Email or Phone number"
    );
  }
  // Find Otp
  const otpData = {
    phoneNumber: user.phoneNumber,
    otp: user.customerOtp,
  };
  const findOtp = await OtpServices.getOtp(otpData);

  if (!findOtp)
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Incorrect OTP. Please try again."
    );

  // Check Otp Validated
  if (findOtp.otp !== user.customerOtp) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Incorrect OTP. Please try again."
    );
  }

  const id = await generateUserId();

  const userData = {
    id: id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: user.password,
  };

  const newUser = new User(userData);
  const result = await newUser.save();
  const token = jwtHelpers.generateToken(result);
  const refreshToken = jwtHelpers.generateRefreshToken(result);
  const { password: pwd, ...others } = result.toObject();

  return {
    user: others,
    token,
    refreshToken,
  };
};

const sendOtp = async (userData) => {
  const { name, email, customerOtp, phoneNumber } = userData;

  // Check if user with the same email or phone number already exists
  const user = await User.findOne({ email });
  const phoneNumberCheck = await User.findOne({ phoneNumber });

  if (user || phoneNumberCheck) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Sorry! This Number or Email Already Exists."
    );
  } else {
    const otpMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${phoneNumber}&senderid=${config.sms_sender_id}&message=For%20Sharikana%20OTP%20for%20account%20verification%20is%3A%20${customerOtp}.%20Enter%20this%20code%20to%20complete%20your%20Signup%20process.%20Thank%20you`;
    const method = "POST";
    // Send SMS and wait for the response

    await otpSendSms2(otpMessage, method);

    // Send OTP To User Email
    const mailMessage = `For Sharikana OTP for account verification is: ${customerOtp}. Enter this code to complete your Signup process. Thank you`;

    let timeNow;

    if (phoneNumber?.substring(0, 2) !== "01") {
      timeNow = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
      });
    } else {
      timeNow = new Date().toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${config.authMail}`,
        pass: `${config.authMailPassword}`,
      },
    });

    const mailOptions = {
      from: `${config.authMail}`,
      to: `${email}`,
      subject: `You have APPROVED an OTP from Sharikana-${timeNow}`,
      html: otpMail(mailMessage, name),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    // Store Otp in database
    const otpData = {
      phoneNumber: phoneNumber,
      otp: customerOtp,
    };
    await OtpServices.createOtp(otpData);
  }
};

const createLogin = async (phoneNumber, password) => {
  if (!phoneNumber || !password) {
    throw new Error("Please provide Phone Number and password");
  }

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error("No user found with the provided phone number.");
  }

  const unauthorizedStatuses = ["blocked", "deactive"];

  if (unauthorizedStatuses.includes(user.status)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Your account is blocked or deactivated. Please contact support."
    );
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new Error("Wrong password");
  }

  const token = jwtHelpers.generateToken(user);
  const refreshToken = jwtHelpers.generateRefreshToken(user);
  const { password: pwd, ...others } = user.toObject();

  await User.updateOne({ phoneNumber: phoneNumber }, { lastLogin: Date.now() });

  return { user: others, token, refreshToken };
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

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new Error(httpStatus.NOT_FOUND, "User does not exist");
  }
  //generate new token

  const newAccessToken = jwtHelpers.generateToken(isUserExist);

  return {
    accessToken: newAccessToken,
  };
};

// Get Single User By Phone Number
const getUserByPhone = async (phoneNumber) => {
  if (!phoneNumber) {
    throw new ApiError(
      httpStatus.httpStatus.NOT_FOUND,
      "This phone number was not found."
    );
  }

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new ApiError(
      httpStatus.httpStatus.NOT_FOUND,
      "No account found with this phone number."
    );
  }

  const { password: pwd, ...others } = user.toObject();
  return others;
};
const getUserById = async (userId) => {
  console.log(userId);

  if (!userId) {
    throw new ApiError(
      httpStatus.httpStatus.NOT_FOUND,
      "This Id was not found."
    );
  }

  const matchConditions = {};
  if (userId) {
    matchConditions["id"] = userId;
  }
  const pipeline = [
    {
      $match: {
        id: userId,
      },
    },

    {
      $project: {
        password: 0,
      },
    },
  ];
  const [users] = await Promise.all([User.aggregate(pipeline)]);

  return users?.[0];
};

// get All User Count
const getAllUsersCount = async () => {
  const users = await User.countDocuments();

  return users;
};

const updateUserStatus = async (id, updatedData) => {
  await User.updateOne(
    { id: id },
    {
      $set: {
        ...updatedData,
      },
    }
  );
};

export const userService = {
  createUser,
  sendOtp,
  refreshToken,
  createLogin,
  // getAllUsers,
  getAllUsersCount,
  getUserByPhone,
  // updateUser,
  getUserById,
  updateUserStatus,
};

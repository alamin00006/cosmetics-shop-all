import User from "../user/user.model.js";
import crypto from "crypto";
import config from "../../../config/index.js";
import bcrypt from "bcryptjs";
import ApiError from "../../../error/ApiError.js";
import httpStatus from "http-status";
import { otpSendSms2 } from "../../../SMS/otpSms2.js";
import { otpMail } from "../../../mail/sendToOtpMail.js";
import nodemailer from "nodemailer";
import { isEmail } from "../../../utils/isEmail.js";

const sendOtp = async (userData) => {
  const { phoneNumber } = userData;

  // Check Exist User
  let user;
  if (isEmail(userData?.identifier)) {
    user = await User.findOne({ email: userData?.identifier });
  } else {
    user = await User.findOne({ phoneNumber: userData?.identifier });
  }

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry! Account not found.");
  }
  // Generate OTP
  const otp = crypto.randomInt(10000, 99999).toString();

  // set expiration time 3 minutes
  const expirationTime = Date.now() + 3 * 60 * 1000;

  if (isEmail(userData?.identifier)) {
    await User.updateOne(
      { email: userData?.identifier },
      { otp, otpExpiration: expirationTime }
    );

    // Send OTP To User Email
    const mailMessage = `You have requested to reset your password for Sharikana. Your OTP is ${otp}. If this wasn't you, please contact our support team immediately. Call 01896-062848`;

    let timeNow;

    if (phoneNumber?.substring(0, 2) !== "01") {
      // For Bangladeshi
      timeNow = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
      });
    } else {
      // For Foreigner
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
      to: `${user?.email}`,
      subject: `You have received an OTP from Sharikana-${timeNow}`,
      html: otpMail(mailMessage, user?.name),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });
  } else {
    // Send SMS user phone
    await User.updateOne(
      { phoneNumber: userData?.identifier },
      { otp, otpExpiration: expirationTime }
    );

    const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${userData?.identifier}&senderid=${config.sms_sender_id}&message=You%20have%20requested%20to%20reset%20your%20password%20for%20Sharikana.%20Your%20OTP%20is%20${otp}.%20If%20this%20wasn't%20you,%20please%20contact%20our%20support%20team%20immediately.%20Call%2001896062848`;
    const method = "POST";
    await otpSendSms2(bookingMessage, method);
  }
};

// Verify OTP
const verifyOtp = async (userData) => {
  let user;
  if (isEmail(userData?.identifier)) {
    user = await User.findOne({ email: userData?.identifier });
  } else {
    user = await User.findOne({ phoneNumber: userData?.identifier });
  }

  if (!user || user.otp !== userData?.otp || Date.now() > user.otpExpiration) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired OTP");
  }

  return true;
};

const resetPassword = async (userData) => {
  const hashedPassword = await bcrypt.hash(
    userData?.password,
    Number(config.bcrypt_salt_rounds)
  );

  if (isEmail(userData?.identifier)) {
    await User.updateOne(
      { email: userData?.identifier },
      { password: hashedPassword, otp: null, otpExpiration: null }
    );
  } else {
    await User.updateOne(
      { phoneNumber: userData?.identifier },
      { password: hashedPassword, otp: null, otpExpiration: null }
    );
  }
};

export const AuthService = {
  sendOtp,
  verifyOtp,
  resetPassword,
};

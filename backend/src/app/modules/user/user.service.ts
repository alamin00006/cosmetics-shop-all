import httpStatus from 'http-status'
import { jwtHelpers } from '../../../helpers/jwtHelpers'

import config from '../../../config'

import nodemailer from 'nodemailer'

import { IUser } from './user.interface'
import User from './user.model'
import ApiError from '../../../errors/ApiError'
import { OtpServices } from '../userOtp/userOtp.service'
import { otpMail } from '../../../mail/sendToOtpMail'
import { otpSendSms2 } from '../../../SMS/otpSms2'
import { generateUserId } from './user.utils'
import { JwtPayload } from 'jsonwebtoken'

interface TokenResponse {
  user: Partial<IUser>;
  token: string;
  refreshToken: string;
}

export const createUser = async (user: {
  email: string,
  phoneNumber: string,
  customerOtp: string,
  name: string,
  password: string,
}): Promise<TokenResponse> => {
  const { email, phoneNumber, customerOtp, name, password } = user

  const findUser = await User.findOne({ email })
  const findUserWithPhone = await User.findOne({ phoneNumber })
  if (findUser || findUserWithPhone) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Sorry! Already Account Created with this Email or Phone number',
    )
  }

  const otpData = { phoneNumber, otp: customerOtp }
  const findOtp = await OtpServices.getOtp(otpData)
  if (!findOtp || findOtp.otp !== customerOtp) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Incorrect OTP. Please try again.')
  }

  const id = await generateUserId()
  const userData = { id, name, email, phoneNumber, password }
  const newUser = new User(userData)
  const result = await newUser.save()
  const token = jwtHelpers.generateToken(result)
  const refreshToken = jwtHelpers.generateRefreshToken(result)
  const { password: pwd, ...others } = result.toObject()

  return { user: others, token, refreshToken }
}

export const sendOtp = async (userData: {
  name: string,
  email: string,
  customerOtp: string,
  phoneNumber: string,
}): Promise<void> => {
  const { name, email, customerOtp, phoneNumber } = userData

  const user = await User.findOne({ email })
  const phoneNumberCheck = await User.findOne({ phoneNumber })
  if (user || phoneNumberCheck) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Sorry! This Number or Email Already Exists.',
    )
  }

  const otpMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${phoneNumber}&senderid=${config.sms_sender_id}&message=For%20Sharikana%20OTP%20for%20account%20verification%20is%3A%20${customerOtp}.%20Enter%20this%20code%20to%20complete%20your%20Signup%20process.%20Thank%20you`
  await otpSendSms2(otpMessage, 'POST')

  const mailMessage = `For Sharikana OTP for account verification is: ${customerOtp}. Enter this code to complete your Signup process. Thank you`
  const timeNow =
    phoneNumber?.substring(0, 2) !== '01'
      ? new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })
      : new Date().toLocaleTimeString('en-GB', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.authMail,
      pass: config.authMailPassword,
    },
  })

  const mailOptions = {
    from: config.authMail,
    to: email,
    subject: `You have APPROVED an OTP from Sharikana-${timeNow}`,
    html: otpMail(mailMessage, name),
  }

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })

  const otpData = { phoneNumber, otp: customerOtp }
  await OtpServices.createOtp(otpData)
}

export const createLogin = async (
  phoneNumber: string,
  password: string,
): Promise<TokenResponse> => {
  if (!phoneNumber || !password) {
    throw new Error('Please provide Phone Number and password')
  }

  const user = await User.findOne({ phoneNumber })
  if (!user) {
    throw new Error('No user found with the provided phone number.')
  }

  const unauthorizedStatuses: string[] = ['blocked', 'deactive']
  if (unauthorizedStatuses.includes(user.status)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account is blocked or deactivated. Please contact support.',
    )
  }

  const isValidPassword = await user.comparePassword(password)
  if (!isValidPassword) {
    throw new Error('Wrong password')
  }

  const token = jwtHelpers.generateToken(user)
  const refreshToken = jwtHelpers.generateRefreshToken(user)
  const { password: pwd, ...others } = user.toObject()

  await User.updateOne({ phoneNumber }, { lastLogin: new Date() })

  return { user: others, token, refreshToken }
}

// export const refreshToken = async (
//   token: string,
// ): Promise<{ accessToken: string }> => {
//   let verifiedToken: { userId: string }
//   try {
//     verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as string)
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
//   }

//   const { userId } = verifiedToken
//   const isUserExist = await User.isUserExist(userId)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
//   }

//   const newAccessToken = jwtHelpers.generateToken(isUserExist)
//   return { accessToken: newAccessToken }
// }

export const getUserByPhone = async (
  phoneNumber: string,
): Promise<Partial<IUser>> => {
  if (!phoneNumber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This phone number was not found.')
  }

  const user = await User.findOne({ phoneNumber })
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No account found with this phone number.',
    )
  }

  const { password: pwd, ...others } = user.toObject()
  return others
}

export const getUserById = async (
  userId: string,
): Promise<Partial<IUser> | null> => {
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This Id was not found.')
  }

  const pipeline = [
    {
      $match: { id: userId },
    },
    {
      $project: { password: 0 },
    },
  ]
  const [users] = await User.aggregate(pipeline)
  return users?.[0] || null
}

export const getAllUsersCount = async (): Promise<number> => {
  const users = await User.countDocuments()
  return users
}

export const updateUserStatus = async (
  id: string,
  updatedData: Partial<IUser>,
): Promise<void> => {
  await User.updateOne({ id }, { $set: updatedData })
}

export const userService = {
  createUser,
  sendOtp,
  // refreshToken,
  createLogin,
  getAllUsersCount,
  getUserByPhone,
  getUserById,
  updateUserStatus,
}

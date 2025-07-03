import { IUserOtp } from './userOtp.interface.js'
import UserOtp from './userOtp.model'

export const createOtp = async (
  otpData: Partial<IUserOtp>,
): Promise<IUserOtp> => {
  const otp = new UserOtp(otpData)
  const result = await otp.save()
  return result
}

export const getOtp = async (
  otpData: Partial<IUserOtp>,
): Promise<IUserOtp | null> => {
  const otp = await UserOtp.findOne(otpData).sort({ createdAt: -1 })
  return otp
}

export const deleteOtp = async (otpData: Partial<IUserOtp>): Promise<void> => {
  await UserOtp.deleteOne(otpData)
}

export const OtpServices = {
  createOtp,
  getOtp,
  deleteOtp,
}

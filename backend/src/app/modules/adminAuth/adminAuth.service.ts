import httpStatus from 'http-status'
import AdminUser from '../adminUser/admin.user.model'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { LoginRequestBody, LoginResponse } from './adminAuth.interface'

// ----------Login-----------
const createLogin = async (
  user: LoginRequestBody,
): Promise<LoginResponse | any> => {
  const { email, password } = user
  // Find user by email
  const adminUser = await AdminUser.findOne({ email })

  if (!adminUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  // Verify password
  const isValidPassword = await adminUser.comparePassword(password)

  if (!isValidPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password')
  }

  // Generate JWT token
  const token = jwtHelpers.generateTokenForAdminUsers(adminUser)

  // Exclude password from user data
  const { password: pwd, ...others } = adminUser.toObject()

  return { adminUser: others, token }
}

export const AdminAuthService = {
  createLogin,
}

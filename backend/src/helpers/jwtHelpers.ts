import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

import httpStatus from 'http-status'
import config from '../config'
import { IAdminUser } from '../app/modules/adminUser/admin.user.interface'
import ApiError from '../errors/ApiError'
import { IUser } from '../app/modules/user/user.interface'

const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    userId: user._id,
    phoneNumber: user?.phoneNumber,
    role: user.role,
  }

  try {
    if (config.jwt.secret == null || config.jwt.expires_in == null) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'JWT configuration is missing',
      )
    }

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expires_in,
    } as jwt.SignOptions)

    return token
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

const generateRefreshToken = (user: IUser): string => {
  const payload = {
    userId: user?._id,
    phoneNumber: user?.phoneNumber,
    role: user.role,
  }

  try {
    if (config.jwt.refresh_secret == null || config.jwt.expires_in == null) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'JWT configuration is missing',
      )
    }

    const token = jwt.sign(payload, config.jwt.refresh_secret, {
      expiresIn: config.jwt.expires_in,
    } as jwt.SignOptions)

    return token
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

const generateTokenForAdminUsers = (user: IAdminUser): string => {
  const payload: JwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  try {
    if (config.jwt.secret == null || config.jwt.expires_in == null) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'JWT configuration is missing',
      )
    }

    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expires_in,
    } as jwt.SignOptions)

    return token
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

export default generateTokenForAdminUsers

// const generateRefreshToken = user => {
//   const payload = {
//     userId: user?._id,
//     phoneNumber: user?.phoneNumber,
//     role: user.role,
//   }

//   const token = jwt.sign(payload, config.jwt.refresh_secret, {
//     expiresIn: config.jwt.refresh_expires_in,
//   })
//   return token
// }

// For Admin Users

// const generateTokenForAdminUsers = user => {
//   const payload = {
//     userId: user?._id,
//     email: user.email,
//     role: user.role,
//   }

//   const token = jwt.sign(payload, config.jwt.secret, {
//     expiresIn: config.jwt.expires_in,
//   })
//   return token
// }

// const generateRefreshTokenForAdminUsers = user => {
//   const payload = {
//     userId: user?._id,
//     email: user.email,
//     role: user.role,
//   }

//   const token = jwt.sign(payload, config.jwt.refresh_secret, {
//     expiresIn: config.jwt.refresh_expires_in,
//   })
//   return token
// }

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret)
}

export const jwtHelpers = {
  generateTokenForAdminUsers,
  generateToken,
  generateRefreshToken,
  //   generateRefreshTokenForAdminUsers,
  //   generateRefreshToken,
  verifyToken,
}

import jwt from "jsonwebtoken";
import "dotenv/config";
import config from "../config/index.js";

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    phoneNumber: user?.phoneNumber,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
  return token;
};
const generateRefreshToken = (user) => {
  const payload = {
    userId: user?._id,
    phoneNumber: user?.phoneNumber,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });
  return token;
};

// For Admin Users

const generateTokenForAdminUsers = (user) => {
  const payload = {
    userId: user?._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  });
  return token;
};

const generateRefreshTokenForAdminUsers = (user) => {
  const payload = {
    userId: user?._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt.refresh_secret, {
    expiresIn: config.jwt.refresh_expires_in,
  });
  return token;
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

// const verifyToken2 = (token ) => {
//   try {
//     const isVerified = verify(token, config.jwt.secret);
//     return isVerified;
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
//   }
// };

export const jwtHelpers = {
  generateToken,
  generateTokenForAdminUsers,
  generateRefreshTokenForAdminUsers,
  generateRefreshToken,
  verifyToken,
};

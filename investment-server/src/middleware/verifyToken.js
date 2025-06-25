import jwt from "jsonwebtoken";
import { promisify } from "util"; // Correctly import promisify
import "dotenv/config"; // Ensure dotenv config is loaded
import config from "../config/index.js";
import httpStatus from "http-status";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Sorry, something is wrong",
      });
    }

    // Correct usage of promisify with jwt.verify
    const decoded = await promisify(jwt.verify)(token, config.jwt.secret);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(httpStatus.FORBIDDEN).json({
      status: "failed",
      message: "Invalid token",
      error: error.message,
    });
  }
};

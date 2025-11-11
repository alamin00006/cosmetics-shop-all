import jwt from "jsonwebtoken";
import User from "../app/modules/user/user.model.js";

export const updateLastActive = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Update last active time and set isActive to true
    await User.findByIdAndUpdate(
      userId,
      { lastLogin: Date.now(), isActive: true },
      { new: true }
    );

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    next();
  }
};

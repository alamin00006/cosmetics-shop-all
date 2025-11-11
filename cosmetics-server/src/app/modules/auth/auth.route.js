// Only For Forgot Password

import express from "express";
import { AuthController } from "./auth.controller.js";

const router = express.Router();

router.route("/send-otp").post(AuthController.sendOtp);
router.route("/verify-otp").post(AuthController.verifyOtp);
router.route("/reset-password").post(AuthController.resetPassword);

export const AuthRoutes = router;

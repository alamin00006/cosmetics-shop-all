import express from "express";

import { verifyToken } from "../../../middleware/verifyToken.js";
import { UsersController } from "./user.controller.js";
import auth from "../../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
// import { encryptFile, uploader } from "../../../middleware/uploader.js";

// import imageUploader from "../../../middleware/uploader.js";

const router = express.Router();

// router
//   .route("/")
//   .get(
//     auth(ENUM_USER_ROLE.COMPANY, ENUM_USER_ROLE.SUPER_ADMIN),
//     UsersController.getAllUsers
//   );
router.route("/count").get(UsersController.getAllUsersCount);
router.route("/send-otp").post(UsersController.sendOtp);
router.route("/signup").post(UsersController.createUser);
router.route("/refresh-token").post(UsersController.refreshToken);

router.route("/login").post(UsersController.createLogin);

router.route("/me").get(verifyToken, UsersController.getUserByPhone);

router.route("/by-id").get(UsersController.getUserById);

// router.route("/:userId").patch(
//   auth(
//     ENUM_USER_ROLE.USER,
//     ENUM_USER_ROLE.PR_MANAGER,
//     ENUM_USER_ROLE.COMPANY,
//     ENUM_USER_ROLE.SUPER_ADMIN
//   ),
//   imageUploader,
//   // uploader,
//   // encryptFile,
//   UsersController.updateUser
// );

router.route("/:id/update-status").patch(UsersController.updateUserStatus);

export const UserRoutes = router;

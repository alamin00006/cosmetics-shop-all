import express from "express";
import { AdminUsersController } from "./adminUser.controller.js";

import { verifyToken } from "../../../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(AdminUsersController.allAdminUser);

// router.route("/create-admin-user").post(createAdminUser);
router.route("/create-admin-user").post(AdminUsersController.createAdminUser);
router
  .route("/:id/update-admin-user")
  .patch(AdminUsersController.updateAdminUser);
router
  .route("/:id/update-password")
  .patch(AdminUsersController.updateAdminUserOnlyPassword);
router
  .route("/:id/update-profile-photo")
  .patch(AdminUsersController.updateProfilePhoto);
router.route("/:id/update-status").patch(AdminUsersController.updateUserStatus);

router.route("/login").post(AdminUsersController.createLogin);
router.post("/refresh-token", AdminUsersController.refreshToken);

router.route("/me").get(verifyToken, AdminUsersController.getMe);

export const AdminUserRoutes = router;

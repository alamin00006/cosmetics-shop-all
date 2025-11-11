import express from "express";
import { notificationController } from "./notification.controller.js";

const router = express.Router();
router.patch("/update-all", notificationController.updateAllNotification);

router.get("/", notificationController.getNotification);
router.patch("/:id", notificationController.updateNotification);

export const notificationRoutes = router;

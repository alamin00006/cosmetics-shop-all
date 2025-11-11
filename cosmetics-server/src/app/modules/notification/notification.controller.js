import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { NotificationService } from "./notification.service.js";

const getNotification = catchAsync(async (req, res) => {
  const query = req.query;

  const notifications = await NotificationService.getNotification(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Notifications Successfully",
    data: notifications,
  });
});

const updateNotification = catchAsync(async (req, res) => {
  const id = req.params.id;

  const notifications = await NotificationService.updateNotification(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Notifications Successfully",
    data: notifications,
  });
});

const updateAllNotification = catchAsync(async (req, res) => {
  const notifications = await NotificationService.updateAllNotification(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Successfully",
    data: notifications,
  });
});

export const notificationController = {
  getNotification,
  updateNotification,
  updateAllNotification,
};

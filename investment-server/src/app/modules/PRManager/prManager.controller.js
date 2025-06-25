import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { PRManagerService } from "./prManager.service.js";

const updatePRManager = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const adminUsers = await PRManagerService.updatePRManager(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated",
    data: adminUsers,
  });
});

export const PRManagerController = {
  updatePRManager,
};

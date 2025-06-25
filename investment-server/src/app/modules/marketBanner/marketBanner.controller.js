import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { marketBannerService } from "./marketBanner.service.js";
import httpStatus from "http-status";

const createMarketBannerForm = catchAsync(async (req, res) => {
  const { ...marketBannerData } = req.body;
  const marketBannerSave = await marketBannerService.createMarketBannerForm(
    marketBannerData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "MarketBanner created successfully!",
    data: marketBannerSave,
  });
});

const getMarketBannerForm = catchAsync(async (req, res) => {
  const allMarketBannerForm = await marketBannerService.getMarketBannerForm();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Market Banner fetched successfully",
    data: allMarketBannerForm,
  });
});

const updateMarketBannerForm = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const updatedMarketBannerForm =
    await marketBannerService.updateMarketBannerForm(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Market Banner updated successfully",
    data: updatedMarketBannerForm,
  });
});
const deleteMarketBannerForm = catchAsync(async (req, res) => {
  const id = req.params.id;

  const updatedMarketBannerForm =
    await marketBannerService.deleteMarketBannerForm(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Market Banner Deleted successfully",
    data: updatedMarketBannerForm,
  });
});
export const marketBannerController = {
  createMarketBannerForm,
  getMarketBannerForm,
  updateMarketBannerForm,
  deleteMarketBannerForm,
};

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { ContactUsService } from "./contact.service.js";

const createContactUs = catchAsync(async (req, res) => {
  const { ...contactUsData } = req.body;

  const contactSave = await ContactUsService.createContactUs(contactUsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact saved successfully!",
    data: contactSave,
  });
});

export const ContactController = {
  createContactUs,
};

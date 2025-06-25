import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { companyService } from "./company.service.js";
import httpStatus from "http-status";

const createCompanyForm = catchAsync(async (req, res) => {
  const { ...companyData } = req.body;

  const companySave = await companyService.createCompanyForm(companyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company created successfully!",
    data: companySave,
  });
});
const createCompany2 = catchAsync(async (req, res) => {
  const { email, password, role, ...userOthersData } = req.body;

  const userData = {
    email,
    password,
    role,
  };

  const companySave = await companyService.createCompany2(
    userOthersData,
    userData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Company created successfully!",
    data: companySave,
  });
});

const getCompanyUser = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;

  const loginUser = await companyService.getCompanyUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: loginUser,
  });
});
const getAllCompanyUser = catchAsync(async (req, res) => {
  const allCompanyUser = await companyService.getAllCompanyUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: allCompanyUser,
  });
});
const getCompanyForm = catchAsync(async (req, res) => {
  const allCompanyForm = await companyService.getCompanyForm();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: allCompanyForm,
  });
});
const updateCompanyForm = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { ...updateData } = req.body;
  const allCompanyForm = await companyService.updateCompanyForm(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user get success",
    data: allCompanyForm,
  });
});

export const companyController = {
  createCompanyForm,
  createCompany2,
  getCompanyForm,
  getCompanyUser,
  updateCompanyForm,
  getAllCompanyUser,
};

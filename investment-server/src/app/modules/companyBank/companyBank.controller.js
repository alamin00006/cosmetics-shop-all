import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { CompanyBankService } from "./companyBank.service.js";

const createCompanyBankAccount = catchAsync(async (req, res) => {
  const { ...bankAccount } = req.body;
  await CompanyBankService.createCompanyBankAccount(bankAccount);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Account created successfully!",
  });
});
const getCompanyBankAccount = catchAsync(async (req, res) => {
  const { companyId, project } = req.query;
  const bankAccounts = await CompanyBankService.getCompanyBankAccount(
    companyId,
    project
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Account created successfully!",
    data: bankAccounts,
  });
});

const getSingleCompanyBankAccount = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const companyBankAccounts =
    await CompanyBankService.getSingleCompanyBankAccount(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: companyBankAccounts,
  });
});

const updateCompanyBankAccount = catchAsync(async (req, res) => {
  const bankId = req?.params?.id;
  const bankData = req.body;
  await CompanyBankService.updateCompanyBankAccount(bankId, bankData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bank Account Update successfully",
  });
});

export const CompanyBankController = {
  createCompanyBankAccount,
  getCompanyBankAccount,
  updateCompanyBankAccount,
  getSingleCompanyBankAccount,
};

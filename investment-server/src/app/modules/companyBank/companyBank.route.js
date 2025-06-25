import express from "express";
import auth from "../../../middleware/auth.js";
import { ENUM_USER_ROLE } from "../../../enums/user.js";
import { CompanyBankController } from "./companyBank.controller.js";

const router = express.Router();

router.get(
  "/:id",
  // auth(ENUM_USER_ROLE.COMPANY),
  CompanyBankController.getSingleCompanyBankAccount
);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.COMPANY),
  CompanyBankController.updateCompanyBankAccount
);

router.post(
  "/",
  auth(ENUM_USER_ROLE.COMPANY),
  CompanyBankController.createCompanyBankAccount
);

router.route("/").get(
  // auth(ENUM_USER_ROLE.COMPANY),
  CompanyBankController.getCompanyBankAccount
);

export const CompanyBankRoutes = router;

import express from "express";
import { companyController } from "./company.controller.js";
import { verifyToken } from "../../../middleware/verifyToken.js";

const router = express.Router();

router.post("/create-company-form", companyController.createCompanyForm);
router.post("/", companyController.createCompany2);
router.get("/", companyController.getAllCompanyUser);
router.get("/company-form", companyController.getCompanyForm);
router.patch("/company-form/:id", companyController.updateCompanyForm);
// router.route("/login").post(companyController.createCompanyLogin);
router.route("/me").get(verifyToken, companyController.getCompanyUser);

export const companyRoutes = router;

import express from "express";
import { ContactController } from "./contact.controller.js";

const router = express.Router();

router.post("/", ContactController.createContactUs);

// router.get("/", companyController.getAllCompanyUser);

export const ContactUsRoutes = router;

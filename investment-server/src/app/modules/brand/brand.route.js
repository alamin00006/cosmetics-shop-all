import express from "express";
import { BrandController } from "./brand.controller.js";

const router = express.Router();

router.post("/", BrandController.createBrand);
router.get("/", BrandController.getBrands);
router.route("/:id").patch(BrandController.updateBrand);

export const BrandRoutes = router;

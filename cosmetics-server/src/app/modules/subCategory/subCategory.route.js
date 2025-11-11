import express from "express";
import { SubCategoryController } from "./subCategory.controller.js";

const router = express.Router();

router.post("/", SubCategoryController.createSubCategory);
router.get("/", SubCategoryController.getSubCategories);
router.route("/:id").patch(SubCategoryController.updateSubCategory);

export const SubCategoryRoutes = router;

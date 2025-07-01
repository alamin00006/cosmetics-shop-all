import express from "express";
import { mainCategoryController } from "./mainCategory.controller.js";

const router = express.Router();

router.post("/", mainCategoryController.createCategory);
router.get("/", mainCategoryController.getCategories);
router.route("/:id").patch(mainCategoryController.updateCategory);

export const MainCategoryRoutes = router;

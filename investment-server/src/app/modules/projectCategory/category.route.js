import express from "express";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.route("/:id").patch(CategoryController.updateCategory);
router.route("/index-update").put(CategoryController.updateCategoryIndex);
export const CategoryRoutes = router;

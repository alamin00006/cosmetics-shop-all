import express from "express";

import { ProductController } from "./product.controller.js";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductDetails);
// router.route("/:id").patch(projectController.updateProjectAdditionalPart);

export const ProductRoutes = router;

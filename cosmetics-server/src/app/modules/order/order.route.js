import express from "express";
import { OrderController } from "./order.controller.js";

const router = express.Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);

router.get("/:id", OrderController.getOrderDetails);
// router.route("/:id").patch(projectController.updateProjectAdditionalPart);

export const OrderRoutes = router;

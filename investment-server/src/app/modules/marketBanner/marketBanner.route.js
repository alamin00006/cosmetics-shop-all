import express from "express";
import { marketBannerController } from "./marketBanner.controller.js";

const router = express.Router();

router.post("/", marketBannerController.createMarketBannerForm);
router.get("/", marketBannerController.getMarketBannerForm);
router.delete("/:id", marketBannerController.deleteMarketBannerForm);

export const marketBannerRoutes = router;

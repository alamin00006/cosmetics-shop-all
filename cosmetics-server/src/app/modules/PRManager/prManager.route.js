import express from "express";
import { PRManagerController } from "./prManager.controller.js";

const router = express.Router();

router.patch("/:id", PRManagerController.updatePRManager);

export const PRManagerRoutes = router;

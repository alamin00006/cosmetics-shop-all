import express from "express";

import { projectController } from "./project.controller.js";

const router = express.Router();
router.get("/count-result", projectController.countResult);
router.get("/company-projects", projectController.getProjectsByPrORCompany);

router.post("/", projectController.createProject);
router.get("/", projectController.getProject);

router.get("/:id", projectController.getProjectDetails);
router.route("/:id").patch(projectController.updateProjectAdditionalPart);
router
  .route("/:id/update-full-project")
  .patch(projectController.updateFullProject);

export const projectRoutes = router;

import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";

import { projectService } from "./project.service.js";
import { encrypt } from "../../../helpers/encrypt.js";

const createProject = catchAsync(async (req, res) => {
  const { ...projectData } = req.body;

  const projectUpload = await projectService.createProject(projectData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Upload Successfully",
    data: projectUpload,
  });
});

// Update Full Project
const updateFullProject = catchAsync(async (req, res) => {
  const projectId = req?.params?.id;

  const { timelines, googleDriveLinks, projectPicture, ...projectData } =
    req.body;

  const updateProject = await projectService.updateFullProject(
    projectId,
    projectData,
    timelines,
    googleDriveLinks,
    projectPicture
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Update successfully",
    data: updateProject,
  });
});

const getProject = catchAsync(async (req, res) => {
  const params = req.query;

  const projects = await projectService.getProject(params);
  const encryptedData = encrypt(projects);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: encryptedData,
  });
});
const getProjectsByPrORCompany = catchAsync(async (req, res) => {
  const { id: prManagerId, companyId, projectId, returnType } = req.query;

  const projects = await projectService.getProjectsByPrORCompany(
    prManagerId,
    companyId,
    projectId,
    returnType
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: projects,
  });
});

const getProjectDetails = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const project = await projectService.getProjectDetails(id);
  const encryptedData = encrypt(project);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Get successfully",
    data: encryptedData,
  });
});

const updateProjectAdditionalPart = catchAsync(async (req, res) => {
  const projectId = req?.params?.id;

  const projectData = req.body;
  await projectService.updateProjectAdditionalPart(projectId, projectData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Update successfully",
  });
});

const countResult = catchAsync(async (req, res) => {
  const countResult = await projectService.countResult();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Count get successfully",
    data: countResult,
  });
});

export const projectController = {
  createProject,
  getProject,
  getProjectDetails,
  updateProjectAdditionalPart,
  updateFullProject,
  getProjectsByPrORCompany,
  countResult,
};

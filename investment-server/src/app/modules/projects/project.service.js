import mongoose from "mongoose";
import Project from "./project.model.js";
import Profit from "../ProfitCount/profitCount.model.js";
import Investment from "../investment/investment.model.js";
import ApiError from "../../../error/ApiError.js";
import httpStatus from "http-status";
import { PROJECT_STATUS } from "../../../constant/project.js";

// Create Project
const createProject = async (projectData) => {
  const project = new Project({
    ...projectData,
    PRManager: "",
  });

  const projectUpload = await project.save();
  return projectUpload;
};

const getProject = async (params) => {
  const { status, isFeatured, isPublished, projectType, durationType } = params;

  // Create the match stage for filtering the documents
  let matchStage = {};
  let projectTypeMatch = {}; // for filtering projectType by name

  if (status && Array.isArray(status)) {
    matchStage.status = { $in: status };
  }
  if (isFeatured) {
    matchStage.isFeatured = isFeatured;
  }
  if (isPublished) {
    matchStage.isPublished = isPublished;
  }
  if (durationType) {
    matchStage["investmentDuration.durationType"] = durationType;
  }
  if (projectType) {
    projectTypeMatch["projectType.name"] = projectType;
  }

  // Use the aggregation pipeline
  const projects = await Project.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: "categories",
        localField: "projectType",
        foreignField: "_id",
        as: "projectType",
      },
    },

    {
      $unwind: {
        path: "$projectType",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Match projectType.name if projectType filter is provided
    ...(projectType ? [{ $match: projectTypeMatch }] : []),

    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },

    {
      $unwind: {
        path: "$company",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "investments",
        let: { project: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$project", "$$project"] },
                  { $eq: ["$status", "Approved"] },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalSoldSlots: { $sum: "$totalBuyShare" },
              // allProperties: { $push: "$$ROOT" },
            },
          },
        ],
        as: "investment",
      },
    },
    {
      $unwind: {
        path: "$investment",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Set status Sold-out when all slots sold
    {
      $set: {
        status: {
          $cond: {
            if: {
              $and: [
                {
                  $eq: [
                    "$totalShareValue",
                    { $ifNull: ["$investment.totalSoldSlots", 0] },
                  ],
                },
              ],
            },
            then: PROJECT_STATUS.SOLD_OUT,
            else: "$status",
          },
        },
      },
    },
  ]);

  // Only update where sold out
  const ids = projects
    .filter((p) => p.totalShareValue === (p.investment?.totalSoldSlots ?? 0))
    .map((p) => p._id);

  if (ids.length > 0) {
    await Project.updateMany(
      { _id: { $in: ids } },
      { $set: { status: PROJECT_STATUS.SOLD_OUT } }
    );
  }

  return projects;
};

// Update Full Project
const updateFullProject = async (
  projectId,
  projectData,
  timelines,
  googleDriveLinks,
  projectPicture
) => {
  const findThisProject = await Project.findOne({ _id: projectId });

  const projectUpdate = await Project.updateOne(
    { _id: projectId },
    {
      $set: {
        ...projectData,
        timelines: timelines,
        googleDriveLinks: googleDriveLinks,
        projectPicture: projectPicture?.length
          ? projectPicture
          : findThisProject?.projectPicture,
      },
    }
  );

  return projectUpdate;
};

const getProjectsByPrORCompany = async (
  prManagerId,
  companyId,
  projectId,
  returnType
) => {
  const matchStage = {};

  const companyIdToObjectId = companyId
    ? mongoose.Types.ObjectId(companyId)
    : null;
  const prManagerIdToObjectId = prManagerId
    ? mongoose.Types.ObjectId(prManagerId)
    : null;
  const projectIdToObjectId = projectId
    ? mongoose.Types.ObjectId(projectId)
    : null;

  if (prManagerIdToObjectId) {
    matchStage["PRManagers.id"] = prManagerIdToObjectId;
  }
  if (companyIdToObjectId) {
    matchStage["company"] = companyIdToObjectId;
  }
  if (projectId) {
    matchStage["_id"] = projectIdToObjectId;
  }

  const pipeline = [
    // Match stage to filter by PRManagers.id or companyId
    { $match: matchStage },

    {
      $set: {
        status: {
          $cond: {
            if: { $eq: ["$totalShareValue", "$buyTotalShare"] },
            then: "Sold-out",
            else: "$status",
          },
        },
      },
    },

    // Facet stage to get total counts based on status
    {
      $facet: {
        projects: [
          {
            $lookup: {
              from: "categories", // Collection name for projectType
              localField: "projectType",
              foreignField: "_id",
              as: "projectTypeDetails",
            },
          },
          {
            $lookup: {
              from: "prmanagers", // Collection name for PRManagers
              localField: "PRManagers.id",
              foreignField: "_id",
              as: "PRManagerDetails",
            },
          },
          {
            $lookup: {
              from: "companies", // Collection name for company
              localField: "company",
              foreignField: "_id",
              as: "companyDetails",
            },
          },
          // Total Sold Data Find without returnType Filter

          {
            $lookup: {
              from: "investments",
              let: { projectId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$project", "$$projectId"] },
                        { $eq: ["$status", "Approved"] },
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    totalSlotsSold: { $sum: "$totalBuyShare" },
                    totalInvestmentAmount: { $sum: "$investmentAmount" },
                    totalInvestors: { $sum: 1 },
                    // investors by return type
                    monthlyInvestors: {
                      $sum: {
                        $cond: [{ $eq: ["$returnType", "Monthly"] }, 1, 0],
                      },
                    },
                    quarterlyInvestors: {
                      $sum: {
                        $cond: [{ $eq: ["$returnType", "Quarterly"] }, 1, 0],
                      },
                    },
                    yearlyInvestors: {
                      $sum: {
                        $cond: [{ $eq: ["$returnType", "Yearly"] }, 1, 0],
                      },
                    },
                    // investment by Return Type
                    monthlyInvestment: {
                      $sum: {
                        $cond: [
                          { $eq: ["$returnType", "Monthly"] },
                          "$investmentAmount",
                          0,
                        ],
                      },
                    },
                    quarterlyInvestment: {
                      $sum: {
                        $cond: [
                          { $eq: ["$returnType", "Quarterly"] },
                          "$investmentAmount",
                          0,
                        ],
                      },
                    },
                    yearlyInvestment: {
                      $sum: {
                        $cond: [
                          { $eq: ["$returnType", "Yearly"] },
                          "$investmentAmount",
                          0,
                        ],
                      },
                    },
                  },
                },
              ],
              as: "totalInvestmentOverviewData",
            },
          },
          {
            $unwind: {
              path: "$totalInvestmentOverviewData",
              preserveNullAndEmptyArrays: true,
            },
          },

          {
            $lookup: {
              from: "investments",
              let: { projectId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$project", "$$projectId"] },
                        { $eq: ["$status", "Approved"] },
                        {
                          $eq: ["$returnType", returnType || "Monthly"],
                        },
                      ],
                    },
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userId",
                  },
                },
                {
                  $unwind: "$userId",
                },
                {
                  $group: {
                    _id: null,
                    returnTypeSlotsSold: { $sum: "$totalBuyShare" },
                    totalInvestmentAmount: { $sum: "$investmentAmount" },
                    totalInvestors: { $sum: 1 },
                    allInvestmentData: { $push: "$$ROOT" },
                  },
                },
              ],
              as: "investment",
            },
          },

          {
            $unwind: {
              path: "$investment",
              preserveNullAndEmptyArrays: true,
            },
          },

          // Optionally, you can add a $project stage to select only the required fields
          // {
          //   $project: {
          //     projectTypeDetails: 1,
          //     PRManagerDetails: 1,
          //     companyDetails: 1,
          //     status: 1, // Include status in the output
          //     // Add other fields you want to include
          //   },
          // },
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalProject: { $sum: 1 },
              soldOutCount: {
                $sum: { $cond: [{ $eq: ["$status", "Sold-out"] }, 1, 0] },
              },
              onGoingCount: {
                $sum: { $cond: [{ $eq: ["$status", "On-Going"] }, 1, 0] },
              },
              upComingCount: {
                $sum: { $cond: [{ $eq: ["$status", "Upcoming"] }, 1, 0] },
              },
            },
          },
        ],
      },
    },

    // Project stage to combine results from facets
    {
      $project: {
        projects: 1,
        totalCounts: { $arrayElemAt: ["$totalCounts", 0] },
      },
    },
  ];

  const result = await Project.aggregate(pipeline).exec();
  return {
    projects: result?.[0]?.projects,
    totalCounts: result?.[0]?.totalCounts,
  };
};

const getProjectDetails = async (id) => {
  const project = await Project.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "categories",
        localField: "projectType",
        foreignField: "_id",
        as: "projectType",
      },
    },
    {
      $unwind: {
        path: "$projectType",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $lookup: {
        from: "prmanagers",
        localField: "PRManagers.id",
        foreignField: "_id",
        as: "PRManagers",
      },
    },
    {
      $lookup: {
        from: "investments",
        let: { project: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$project", "$$project"] },
                  { $eq: ["$status", "Approved"] },
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalSoldSlots: { $sum: "$totalBuyShare" },
              // allProperties: { $push: "$$ROOT" },
            },
          },
        ],
        as: "investment",
      },
    },
    {
      $unwind: {
        path: "$investment",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  return project?.[0];
};

// const getProjectDetails = async (id) => {
//   const project = await Project.findOne({ _id: id }).populate(
//     "projectType company PRManagers.id"
//   );

//   return project;
// };
const updateProjectAdditionalPart = async (projectId, projectData) => {
  const { status, prManager, updateType, isFeatured, isPublished } =
    projectData;

  const updateQuery = { _id: projectId };
  const updateOptions = {};

  if (status === "On-Going" || status === "Upcoming") {
    updateOptions.$set = { status };
  } else if (updateType === "ADD_PRManger") {
    // Find Already Existing PR
    const project = await Project.findOne({
      _id: projectId,
      PRManagers: { $elemMatch: { id: prManager } },
    });

    if (project) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry! This PR Already Exist"
      );
    }

    updateOptions.$push = { PRManagers: { id: prManager } };
  } else if (updateType === "REMOVE_PRManger") {
    updateOptions.$pull = { PRManagers: { id: prManager } };
  } else if (isFeatured !== undefined) {
    updateOptions.$set = { isFeatured };
  } else if (isPublished !== undefined) {
    updateOptions.$set = { isPublished };
  } else {
    updateOptions.$set = { status };
  }

  await Project.updateOne(updateQuery, updateOptions);
};

const countResult = async () => {
  const matchProject = {
    status: {
      $in: [PROJECT_STATUS.ON_GOING, PROJECT_STATUS.SOLD_OUT],
    },
  };
  const matchProjectSoldOut = {
    status: PROJECT_STATUS.SOLD_OUT,
  };
  const matchProfit = {
    paymentStatus: "Paid",
  };
  const matchInvestment = {
    status: "Approved",
  };

  const totalProjectCount = await Project.countDocuments(matchProject);
  // const totalProfitShareCount = await Profit.countDocuments(matchProfit);
  const totalSoldOutProjectCount = await Project.countDocuments(
    matchProjectSoldOut
  );

  const profitsTotalPipeline = [
    { $match: matchProfit },
    {
      $group: {
        _id: null,
        totalProfitsAmount: { $sum: "$profitCount" },
      },
    },
  ];

  const totalProfitShareCount = await Profit.aggregate(profitsTotalPipeline);

  const InvestmentTotalPipeline = [
    { $match: matchInvestment },
    {
      $group: {
        _id: null,
        totalInvestmentAmount: { $sum: "$investmentAmount" },
        totalInvestor: { $sum: 1 },
      },
    },
  ];

  const investmentsTotal = await Investment.aggregate(InvestmentTotalPipeline);

  return {
    totalProjectCount,
    totalSoldOutProject: totalSoldOutProjectCount,
    totalProfitShareCount: totalProfitShareCount[0]?.totalProfitsAmount || 0,
    totalInvestmentAmount: investmentsTotal[0]?.totalInvestmentAmount || 0,
    totalInvestor: investmentsTotal[0]?.totalInvestor || 0,
  };
};

export const projectService = {
  createProject,
  getProject,
  getProjectDetails,
  updateProjectAdditionalPart,
  updateFullProject,
  getProjectsByPrORCompany,
  countResult,
};

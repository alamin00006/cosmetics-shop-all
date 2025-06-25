import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const investmentDurationSchema = new mongoose.Schema(
  {
    durationValue: {
      type: Number,
      required: true,
    },
    durationType: {
      type: String,
      enum: ["Month", "Year"],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },

    projectType: {
      type: ObjectId,
      ref: "Category",
      // required: true,
    },
    company: {
      type: ObjectId,
      ref: "Company",
      // required: true,
    },
    PRManagers: [
      {
        id: {
          type: ObjectId,
          ref: "PRManager",
        },
      },
    ],
    aboutProject: {
      type: String,
    },
    aboutProject2: {
      type: String,
    },
    managementInfo: {
      type: String,
    },
    exitStrategy: {
      type: String,
    },
    googleMapLink: {
      type: String,
    },
    youtubeVideoLink: {
      type: String,
    },
    totalInvestmentValue: {
      type: Number,
    },
    perShareValue: {
      type: Number,
    },
    minimumShareValue: {
      type: Number,
    },
    maximumShareValue: {
      type: Number,
    },
    totalShareValue: {
      type: Number,
    },
    buyTotalShare: {
      type: Number,
      default: 0,
    },
    availableTotalShare: {
      type: Number,
    },
    totalProjectValue: {
      type: Number,
    },
    projectAssetValue: {
      type: Number,
    },
    notaryFee: {
      type: Number,
    },
    sharikanaFee: {
      type: Number,
    },

    yearlyReturnValue: {
      type: Number,
    },

    quarterlyReturnValue: {
      type: Number,
    },

    monthlyReturnValue: {
      type: Number,
    },

    averageReturnValue: {
      type: Number,
    },
    investmentDuration: {
      type: investmentDurationSchema,
      required: true,
    },

    projectAnnualCapitalAppreciation: {
      type: Number,
    },
    googleDriveLinks: Object,
    aboutPropertyDistrict: {
      type: String,
    },
    aboutPropertyCity: {
      type: String,
    },
    timelines: Object,

    projectPicture: {
      type: Array,
    },
    projectCoverPhoto: {
      type: String,
    },

    projectPdf: {
      type: Array,
    },
    // profit Count
    totalProfitCount: {
      type: Number,
    },
    payOfProfitAmount: {
      type: Number,
    },
    dueProfitAmount: {
      type: Number,
    },

    investmentStartDate: {
      type: Date,
    },
    investmentEndDate: {
      type: Date,
    },

    firstReturnDate: {
      type: Date,
    },
    isFeatured: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    isPublished: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Canceled",
        "Upcoming",
        "Sold-out",
        "On-Going",
      ],
      default: "Pending",
    },
    uploadedBy: {
      type: ObjectId,
      ref: "PRManager",
      // required: true,
    },

    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },

    zipCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;

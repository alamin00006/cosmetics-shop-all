import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const companyBankSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      required: [true, "Please Provide Bank Name"],
      trim: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    accountType: {
      type: String,
    },
    branchName: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
    company: {
      type: ObjectId,
      ref: "Company",
      required: true,
    },
    project: {
      type: ObjectId,
      ref: "Project",
      // required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyBank = mongoose.model("CompanyBank", companyBankSchema);

export default CompanyBank;

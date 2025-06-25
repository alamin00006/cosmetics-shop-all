import mongoose from "mongoose";

const companyFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    companyOwnerName: {
      type: String,
      required: true,
    },
    companyOwnerPhoneNumber: {
      type: String,
    },
    designation: {
      type: String,
    },

    businessAddress: {
      type: String,
    },
    // Company Validation
    tinNumber: {
      type: String,
    },
    tradeLicenceNumber: {
      type: String,
    },
    binNumber: {
      type: String,
    },
    // Bank Details
    bankName: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    accountType: {
      type: String,
    },
    // Attachment
    incorporationCertificate: {
      type: Array,
    },
    tradeLicense: {
      type: Array,
    },
    binCertificate: {
      type: Array,
    },
    tinCertificate: {
      type: Array,
    },
    companyLogo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Canceled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const CompanyForm = mongoose.model("CompanyForm", companyFormSchema);

export default CompanyForm;

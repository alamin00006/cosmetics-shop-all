import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const companySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: [true, "Company ID must be unique"],
    },
    createdUser: {
      type: ObjectId,
      ref: "AdminUser",
    },
    name: {
      type: String,
      required: true,
      unique: [true, "Company name must be unique"],
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;

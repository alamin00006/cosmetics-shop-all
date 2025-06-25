import AdminUser from "../adminUser/adminUser.model.js";

import mongoose from "mongoose";

import Company from "./company.model2.js";
import { generateAdminUserId } from "../adminUser/adminUser.utils.js";
import CompanyForm from "../companyForm/companyUserForm.model.js";

const createCompanyForm = async (companyData) => {
  const company = {
    ...companyData,
  };

  const newCompany = new CompanyForm(company);
  const companySave = await newCompany.save();

  return companySave;
};

const createCompany2 = async (companyData, user) => {
  // Check if an admin user with the same email exists
  const findUser = await AdminUser.findOne({ email: user.email });
  if (findUser) {
    throw new Error("Sorry! An account already exists with this email.");
  }

  const session = await mongoose.startSession();
  let newUserAllData = null;

  try {
    session.startTransaction();

    // Generate a new Admin ID
    const id = await generateAdminUserId();

    user.id = id;

    const newCompanyData = {
      id,
      ...companyData,
    };

    // Create a new Company
    const newCompany = await Company.create([newCompanyData], {
      session,
    });

    if (!newCompany.length) {
      throw new Error("Failed to create Company.");
    }

    user.company = newCompany[0]._id;

    // Create a new AdminUser
    const newUser = await AdminUser.create([user], { session });
    if (!newUser.length) {
      throw new Error("Failed to create AdminUser.");
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  return newUserAllData;
};

// get Company Registration data
const getCompanyForm = async () => {
  const companyForms = await CompanyForm.find({});

  return companyForms;
};

// Update Company Form Data
const updateCompanyForm = async (id, updateData) => {
  const companyForms = await CompanyForm.updateOne(
    { _id: id },
    {
      $set: {
        status: updateData?.status,
      },
    }
  );

  return companyForms;
};

const getCompanyUser = async (userId) => {
  const companyUser = await Company.findOne({ _id: userId });
  const { password: pwd, ...others } = companyUser?.toObject();

  return others;
};
const getAllCompanyUser = async () => {
  const companyUser = await Company.find({});

  return companyUser;
};

export const companyService = {
  createCompanyForm,
  createCompany2,
  getCompanyForm,
  getCompanyUser,
  getAllCompanyUser,
  updateCompanyForm,
};

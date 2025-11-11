import CompanyBank from "./companyBank.model.js";

const createCompanyBankAccount = async (bankAccount) => {
  const bankAccountData = {
    ...bankAccount,
  };
  const newBankAccount = new CompanyBank(bankAccountData);
  await newBankAccount.save();
};
const getCompanyBankAccount = async (companyId, project) => {
  let bankAccounts;

  if (companyId) {
    bankAccounts = await CompanyBank.find({ company: companyId }).populate({
      path: "project",
      select: "projectTitle",
    });
  } else if (project) {
    bankAccounts = await CompanyBank.find({ project: project }).populate({
      path: "project",
      select: "projectTitle",
    });
  } else {
    throw new Error("Either companyId or project must be provided.");
  }

  return bankAccounts;
};

const getSingleCompanyBankAccount = async (id) => {
  const companyBankAccounts = await CompanyBank.findOne({ _id: id });

  return companyBankAccounts;
};

const updateCompanyBankAccount = async (bankId, bankData) => {
  const bankAccount = await CompanyBank.updateOne(
    { _id: bankId },
    {
      $set: {
        ...bankData,
      },
    }
  );
  return bankAccount;
};

export const CompanyBankService = {
  createCompanyBankAccount,
  getCompanyBankAccount,
  updateCompanyBankAccount,
  getSingleCompanyBankAccount,
};

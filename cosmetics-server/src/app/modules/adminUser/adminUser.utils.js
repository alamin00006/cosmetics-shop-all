import AdminUser from "./adminUser.model.js";
export const findLastUserId = async () => {
  const lastInvestor = await AdminUser.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastInvestor?.id ? lastInvestor.id.substring() : undefined;
};

export const generateAdminUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0"); //00000

  // Increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  return incrementedId;
};

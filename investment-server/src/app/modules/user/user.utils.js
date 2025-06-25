import User from "./user.model.js";

export const findLastUserId = async () => {
  const lastUser = await User.findOne(
    {
      role: "User",
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

export const generateUserId = async () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, "0");

  // Increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, "0");

  // Get the last two digits of the year and prepend to the incremented ID
  incrementedId = year.substring(2) + incrementedId;

  return incrementedId;
};

import PRManager from "./prManager.model.js";

const updatePRManager = async (id, updateData) => {
  const prManager = await PRManager.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        userPhoto: updateData?.userPhoto,
      },
    }
  );

  return prManager;
};

export const PRManagerService = {
  updatePRManager,
};

import MarketBanner from "./marketBanner.model.js";

const createMarketBannerForm = async (marketBannerData) => {
  const newMarketBanner = new MarketBanner({
    ...marketBannerData,
  });
  const marketBannerSave = await newMarketBanner.save();
  return marketBannerSave;
};

const getMarketBannerForm = async () => {
  const marketBannerForms = await MarketBanner.find({});
  return marketBannerForms;
};

const updateMarketBannerForm = async (id, updateData) => {
  const updatedMarketBannerForm = await MarketBanner.updateOne(
    { _id: id },
    {
      $set: {
        bannerImage: updateData.bannerImage,
      },
    }
  );
  return updatedMarketBannerForm;
};

const deleteMarketBannerForm = async (id) => {
  const updatedMarketBannerForm = await MarketBanner.deleteOne({ _id: id });
  return updatedMarketBannerForm;
};

export const marketBannerService = {
  createMarketBannerForm,
  getMarketBannerForm,
  updateMarketBannerForm,
  deleteMarketBannerForm,
};

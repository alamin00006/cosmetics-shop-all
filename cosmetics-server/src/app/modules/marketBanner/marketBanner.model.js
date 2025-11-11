import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const marketBannerSchema = new mongoose.Schema(
  {
    bannerImage: {
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

const MarketBanner = mongoose.model("MarketBanner", marketBannerSchema);

export default MarketBanner;

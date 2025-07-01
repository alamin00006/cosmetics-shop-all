import Brand from "./brand.model.js";

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const result = await brand.save();

    res.status(200).json({
      status: "success",
      message: "Brand Added Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Brand not Added",
      error: error.message,
    });
  }
};

const getBrand = async (req, res) => {
  try {
    const brandTotalCount = await Brand.countDocuments({});
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);

    if (page || size) {
      const brand = await Brand.find({})
        .skip(page * size)
        .limit(size);

      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: {
          brand,
          brandTotalCount: brandTotalCount,
        },
      });
    } else {
      const brands = await Brand.find({});
      res.status(200).json({
        status: "success",
        message: "data get Success",
        data: brands,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত কোন ডাটা খুঁজে পাওয়া যায়নি",
      error: error.message,
    });
  }
};

const getBrandDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const brandProduct = await Brand.findById(id).populate("products");

    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: publicationProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Brand.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "ধন্যবাদ, আপডেট হয়ে গেছে",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "দুঃখিত ! আপনি কোথাও মনে হয় ভুল করেছেন",
      error: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Brand.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Brand delete Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Brand not Delete",
      error: error.message,
    });
  }
};

export const BrandController = {
  createBrand,
  getBrand,
  getBrandDetails,
  updateBrand,
  deleteBrand,
};

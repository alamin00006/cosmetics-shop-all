import Review from "./review.model.js";

const createReview = async (req, res) => {
  try {
    // console.log(req.body)

    const review = new Review(req.body);

    const result = await review.save();

    res.status(200).json({
      status: "success",
      message: "Thank you for the review, we will publish it soon.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not inserted",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    // console.log(req.params.id)
    // const id = req.params.id;
    const reviews = await Review.find({});
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
    res.status(200).json({
      status: "success",
      message: "Review get Success",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Review not found",
      error: error.message,
    });
  }
};

const reviewStatusUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Review.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Review Approved",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: " Review Status not updated",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Review.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Review delete Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Review not Delete",
      error: error.message,
    });
  }
};
export const ReviewController = {
  createReview,
  getReviews,
  reviewStatusUpdate,
  deleteReview,
};

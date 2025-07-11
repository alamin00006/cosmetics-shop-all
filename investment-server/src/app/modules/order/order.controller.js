import Order from "./order.model.js";

const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query?.page);
    const size = parseInt(req.query?.size);
    const orders = await Order.find({})
      .skip(page * size)
      .limit(size);
    const orderTotalCount = await Order.countDocuments({});

    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
    res.status(200).json({
      status: "success",
      message: "All Order get Success",
      data: {
        orders,
        orderTotalCount,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Sorry Order not found",
      error: error.message,
    });
  }
};
const getOrders = async (req, res, next) => {
  try {
    const user = req.params.user;
    // console.log(user)
    const orders = await Order.find({ user });
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    // const products = await Product.findById('63b278bdceb2c72867ad2964')
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    //     const query = {_id:ObjectId(id)};
    //    const products = await Product.findOne(query)
    //     where("name").equals(/\w/)
    //    .where('quantity').gte(100)
    const order = await Order.findById(id);
    res.status(200).json({
      status: "success",
      message: "data get Success",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data not found",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    // console.log(req.body)

    const order = new Order(req.body);

    const result = await order.save();

    res.status(200).json({
      status: "success",
      message: "Thanks For Your Order",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "order not complete",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Order delete Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Order not Delete",
      error: error.message,
    });
  }
};

const orderStatusUpdate = async (req, res, next) => {
  try {
    const orderStatus = req.body?.orderStatus;
    const { id } = req.params;
    const result = await Order.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    if (orderStatus === "Cancelled") {
      res.status(200).json({
        status: "success",
        message: "This Order Cancelled",
        data: result,
      });
    }
    if (orderStatus === "Approved") {
      res.status(200).json({
        status: "success",
        message: "Wow! This Order Approved",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Status not updated",
      error: error.message,
    });
  }
};

export const OrderController = {
  getAllOrders,
  getOrders,
  getOrderDetails,
  createOrder,
  deleteOrder,
  orderStatusUpdate,
};

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
// Schema Design
const orderSchema = mongoose.Schema(
  {
    orderItems: {
      type: Array,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",

      //   required: true,
    },
    name: {
      type: String,
      //   required: [true, "Please Provide Your Name"],
    },

    email: {
      type: String,
      //   required: [true, "Please Provide Your Email"],
    },
    phone: {
      type: String,
      //   required: [true, "Please Provide Your Phone Number"],
    },
    country: {
      type: String,
    },
    city: {
      type: String,
      //   required: [true, "Please Provide Your City Name"],
    },
    zip: {
      type: String,
      //   required: [true, "Please Provide Your Zip Code"],
    },
    address: {
      type: String,
      //   required: [true, "Please Provide Your Address"],
    },
    district: {
      type: String,
      //   required: [true, "Please Provide Your District Name"],
    },
    paymentType: {
      type: String,
      //   required: [true, "Please Provide Your Payment Type"],
    },
    bkashNumber: {
      type: String,
    },
    bkashTrx: {
      type: String,
    },
    nagadNumber: {
      type: String,
    },
    nagadTrx: {
      type: String,
    },
    dutchNumber: {
      type: String,
    },
    dutchTrx: {
      type: String,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// middleware
// productSchema.pre('save', function(next){
//     if(this.quantity === 0){
//         this.status = 'out-of-stock'
//     }
//     next()
// })

// productSchema.methods.getName = function(){
// console.log(`this product ${this.name} added`)
// }
// Model
const Order = mongoose.model("Order", orderSchema);

export default Order;

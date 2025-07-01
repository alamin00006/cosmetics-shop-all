import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "BDT",
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
  shade: {
    type: String,
  },
  availableShades: [
    {
      name: String,
      color: String,
      image: String, // Stores ImgBB URL
    },
  ],
  productImage: String, // Stores ImgBB URL for single image
  description: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  ingredients: [
    {
      type: String,
    },
  ],
  countryOfOrigin: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  addressOfManufacturer: {
    type: String,
    required: true,
  },
  howToUse: {
    type: String,
  },
  shelfLife: {
    type: String,
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory", // References the subcategory's _id
    required: true,
  },
  brandInfo: {
    founded: {
      type: Number,
    },
    followers: {
      type: String,
    },
    locations: {
      type: String,
    },
    orders: {
      type: String,
    },
  },
  certifications: {
    authentic: {
      type: String,
    },
    shipping: {
      type: String,
    },
    payment: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

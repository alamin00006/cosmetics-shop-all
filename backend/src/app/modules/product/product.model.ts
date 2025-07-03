import mongoose, { Schema, Document } from 'mongoose'
import { IProduct } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'BDT' },
    pointsEarned: { type: Number, default: 0 },
    shade: { type: String },
    availableShades: [{ name: String, color: String, image: String }],
    productImage: [
      {
        title: { type: String, default: null },
        image: { type: String, default: null },
      },
    ],
    description: { type: String, required: true },
    features: [{ type: String }],
    ingredients: [{ type: String }],
    countryOfOrigin: { type: String, required: true },
    manufacturer: { type: String, required: true },
    addressOfManufacturer: { type: String, required: true },
    howToUse: { type: String },
    shelfLife: { type: String },
    productCode: { type: String, unique: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', default: null },
    mainCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategory',
      default: null,
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
      default: null,
    },
    brandInfo: {
      founded: { type: Number },
      followers: { type: String },
      locations: { type: String },
      orders: { type: String },
    },
    certifications: {
      authentic: { type: String },
      shipping: { type: String },
      payment: { type: String },
    },
    isFeatured: { type: String, enum: ['Yes', 'No'], default: 'No' },
    isPublished: { type: String, enum: ['Yes', 'No'], default: 'No' },
  },
  { timestamps: true },
)

const Product = mongoose.model('Product', productSchema)
export default Product

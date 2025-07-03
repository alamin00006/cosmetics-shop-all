import mongoose, { Schema, Document } from 'mongoose'
import { ISubCategory } from './subCategory.interface'

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: { type: String },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

const SubCategory = mongoose.model('SubCategory', SubCategorySchema)
export default SubCategory

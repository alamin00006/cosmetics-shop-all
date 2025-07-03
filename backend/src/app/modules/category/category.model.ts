import mongoose, { Schema, Document } from 'mongoose'
import { ICategory } from './category.interface'

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      unique: true,
      enum: ['Must be unique name'],
      required: true,
    },
    description: { type: String },
    mainCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategory',
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
const Category = mongoose.model<ICategory>('Category', CategorySchema)
export default Category

import mongoose, { Schema } from 'mongoose'
import { IMainCategory } from './mainCategory.interface'

const MainCategorySchema = new Schema<IMainCategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
const MainCategory = mongoose.model<IMainCategory>(
  'MainCategory',
  MainCategorySchema,
)
export default MainCategory

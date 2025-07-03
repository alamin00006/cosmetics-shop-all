import mongoose, { Schema, Document } from 'mongoose'
import { IReview } from './review.interface'

const ReviewSchema = new Schema<IReview>(
  {
    forProduct: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Approved', 'Unapproved'],
      default: 'Unapproved',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Review = mongoose.model<IReview>('Review', ReviewSchema)
export default Review

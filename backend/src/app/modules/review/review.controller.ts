import { Request, Response, NextFunction } from 'express'
import { IReview } from './review.interface.js'
import Review from './review.model'

const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = new Review(req.body as Partial<IReview>)
    const result = await review.save()

    res.status(200).json({
      status: 'success',
      message: 'Thank you for the review, we will publish it soon.',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'data not inserted',
      error: error.message,
    })
  }
}

const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({})
    res.status(200).json({
      status: 'success',
      message: 'Review get Success',
      data: reviews,
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Review not found',
      error: error.message,
    })
  }
}

const reviewStatusUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await Review.updateOne(
      { _id: id },
      { $set: req.body as Partial<IReview> },
      { runValidators: true },
    )

    res.status(200).json({
      status: 'success',
      message: 'Review Approved',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Review Status not updated',
      error: error.message,
    })
  }
}

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await Review.findByIdAndDelete(id)

    res.status(200).json({
      status: 'success',
      message: 'Review delete Successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      status: 'failed',
      message: 'Review not Delete',
      error: error.message,
    })
  }
}

export const ReviewController = {
  createReview,
  getReviews,
  reviewStatusUpdate,
  deleteReview,
}

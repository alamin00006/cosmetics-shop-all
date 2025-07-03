import mongoose from 'mongoose'

export interface IReview {
  forProduct: mongoose.Types.ObjectId;
  rating: number;
  name: string;
  comment: string;
  status: 'Approved' | 'Unapproved';
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

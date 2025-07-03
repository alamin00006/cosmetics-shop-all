import mongoose from 'mongoose'

export interface ISubCategory {
  name: string;
  description?: string;
  categoryId: mongoose.Types.ObjectId;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

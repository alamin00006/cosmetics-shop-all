import mongoose from 'mongoose'

export interface ICategory {
  name: string;
  description?: string;
  mainCategoryId: mongoose.Types.ObjectId;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

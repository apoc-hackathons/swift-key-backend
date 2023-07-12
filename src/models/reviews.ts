import { Schema, model } from 'mongoose';
import { IReview } from '../types';

const reviewSchema = new Schema<IReview>(
  {
    title: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    images: [{ type: String }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export const Review = model<IReview>('Review', reviewSchema);

import mongoose, { model } from 'mongoose';
import { IProduct } from '../types';

const prodSchema = new mongoose.Schema<IProduct>(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    restockDate: { type: Number, required: true },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Product = model<IProduct>('Product', prodSchema);

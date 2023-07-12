import mongoose, { model } from 'mongoose';
import { ISoldProducts } from '../types';

const soldProduct = new mongoose.Schema<ISoldProducts>(
  {
    _id: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    customerName: { type: String, required: true },
    itemsBought: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    ],
    total: {
      type: Number,
      required: true
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export const SoldProduct = model<ISoldProducts>('SoldProduct', soldProduct);

import { Schema, model } from 'mongoose';
import { ITransaction } from '../types';

const transactionSchema = new Schema<ITransaction>({
  _id: {
    type: String,
    required: true
  }
});

export const Transaction = model<ITransaction>(
  'Transaction',
  transactionSchema
);

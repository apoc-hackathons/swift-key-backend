import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    uid: {
      type: String
    },
    email: {
      type: String
    },
    emailVerified: {
      type: Boolean
    },
    displayName: {
      type: String
    },
    isAnonymous: {
      type: Boolean
    },
    photoURL: {
      type: String
    },
    providerData: {
      type: Object
    },
    stsTokenManager: {
      type: Object
    },
    createdAt: {
      type: String
    },
    lastLoginAt: {
      type: String
    },
    apiKey: {
      type: String
    },
    appName: {
      type: String
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
);

export const User = model<IUser>('User', userSchema);

export interface IUser {
  _id: string;
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerData: {
    providerId: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: number;
    photoURL: string;
  };
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
  transactions: ITransaction[];
  reviews: IReview[];
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  restockDate: number;
  reviews: IReview[];
}

export interface IReview {
  _id: string;
  title: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: number;
  updatedAt: number;
  user: IUser;
}

export interface ISoldProducts {
  _id: string;
  uid: string;
  customerName: string;
  sessionId: string;
  itemsBought: IProduct[];
  total: number;
  createdAt: number;
  transactions: ITransaction[];
}

export interface ITransaction {
  _id: string;
}

export interface ITokenPayload {
  name: string;
  uid: string;
}

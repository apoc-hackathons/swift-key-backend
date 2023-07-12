import * as dotenv from 'dotenv';
import { JwtPayload, verify, sign } from 'jsonwebtoken';
import { IUser } from '../types';

dotenv.config({ path: __dirname + '/../.env' });

const { USER_ACCESS_TOKEN_SECRET, USER_REFRESH_TOKEN_SECRET } = process.env;

/**
 * @description - Generates user token
 */

export const generateUserToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.uid
    },
    options = {
      expiresIn: '30d'
    };
  const token = await sign(payload, `${USER_ACCESS_TOKEN_SECRET}`, options);

  return token;
};

/**
 * @description - Generates refresh token
 */

export const checkInUserToken = async (uid: string) => {
  const payload: JwtPayload = {
      userId: uid
    },
    options = {
      expiresIn: '3h'
    };
  const token = await sign(payload, `${USER_REFRESH_TOKEN_SECRET}`, options);

  return token;
};

/**
 * @description - Verifies user token
 */

export const verifyUserToken = async (token: string): Promise<boolean> => {
  const verified = await verify(
    token,
    `${USER_ACCESS_TOKEN_SECRET}` || `${USER_REFRESH_TOKEN_SECRET}`
  );

  if (verified) {
    return true;
  }
  return false;
};

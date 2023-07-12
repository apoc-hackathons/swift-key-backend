import { Response, Request } from 'express';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';
import { checkInUserToken } from '../../middleware/token';

export const checkInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { uid } = req.params;

    const token = await checkInUserToken(uid);
    logger.info(`User ${uid} checked in successfully`);
    res
      .status(200)
      .cookie('checkIn', token, {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000,
        secure: true
      })
      .json({
        message: 'User checked in successfully',
        token
      });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

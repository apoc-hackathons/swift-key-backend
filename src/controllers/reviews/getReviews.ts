import { Review } from '../../models/reviews';
import { Request, Response } from 'express';
import { serverError } from '../../utils/errorHandler';
import { verifyUserToken } from '../../middleware/token';
import { logger } from '../../utils/logger';

export const getReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      res.status(401).json({ msg: 'Unauthorized, please login' });
      logger.info('Unauthorized');
    }

    const verifiedToken: boolean | undefined = await verifyUserToken(
      authToken?.split(' ')[1] as string
    );

    if (!verifiedToken) {
      res.status(401).json({ msg: 'Unauthorized, please login' });
      logger.info('Unauthorized');
    }

    const reviews = await Review.find().populate('User');
    res.status(200).json(reviews);
    logger.info('reviews fetched successfully: ', reviews);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

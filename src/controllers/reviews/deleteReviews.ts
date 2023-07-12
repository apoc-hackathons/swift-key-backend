import { Review } from '../../models/reviews';
import { Request, Response } from 'express';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';
import { verifyUserToken } from '../../middleware/token';

export const deleteReview = async (
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

    const review = await Review.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'review deleted successfully'
    });
    logger.info('review deleted successfully: ', review);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

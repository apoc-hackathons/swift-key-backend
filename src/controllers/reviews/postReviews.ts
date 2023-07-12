import { Review } from '../../models/reviews';
import { Request, Response } from 'express';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';
import { verifyUserToken } from '../../middleware/token';
import { IReview } from '../../types';
import { HydratedDocument } from 'mongoose';

interface Files {
  image: Express.MulterS3.File[];
}

export const postReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, rating, comment, userId } = req.body;

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

    const files = <Files | undefined>req.files;
    const imagesArray: string[] = [];
    files?.image.map((file) => {
      imagesArray.push(file?.location);
    });

    const review: HydratedDocument<IReview> = await Review.create({
      title,
      rating,
      comment,
      user: userId,
      images: imagesArray
    });
    res.status(201).json({
      message: 'review posted successfully'
    });
    logger.info('review posted successfully: ', review);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

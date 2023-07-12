import { Response, Request } from 'express';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';
import { verifyUserToken } from '../../middleware/token';
import { ISoldProducts } from '../../types';
import { SoldProduct } from '../../models/soldProducts';

export const checkOutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const { uid } = req.params;
    const { customerName, itemsBought, total, transactions } = req.body;

    const verified = await verifyUserToken(token as string);

    if (!verified) {
      logger.error('User not checked in');
      res.status(401).json({
        message: 'User not checked in'
      });
    }

    const newSoldProduct: ISoldProducts = await SoldProduct.create({
      uid,
      customerName,
      itemsBought,
      total,
      transactions
    });
    res.status(201).json({
      message: 'User checked out successfully'
    });
    logger.info('User checked out successfully', newSoldProduct);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

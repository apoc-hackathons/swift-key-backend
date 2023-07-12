import { Response } from 'express';
import { Product } from '../../models/product';
import { logger } from '../../utils/logger';
import { serverError } from '../../utils/errorHandler';

export const getProducts = async (res: Response): Promise<void> => {
  try {
    const product = await Product.find({});
    if (!product) {
      res.status(400).json({ msg: 'No product found' });
      logger.info('No product found');
    }

    res.status(200).json(product);
    logger.info('Product found', product);
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

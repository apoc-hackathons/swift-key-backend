import { Response } from 'express';
import { logger } from './logger';
import { config } from 'dotenv';

config({ path: `${__dirname}/../../.env` });

export const serverError = (err: Error, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    logger.error({
      message: err.stack
    });
    res.status(500).send('Internal Server Error');
  } else {
    logger.error({
      message: err.stack
    });
    res.status(500).send(err.stack);
  }
};

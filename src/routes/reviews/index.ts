import { Router } from 'express';
import { getReviews } from '../../controllers/reviews/getReviews';
import { postReview } from '../../controllers/reviews/postReviews';
import { patchReview } from '../../controllers/reviews/patchReviews';
import { deleteReview } from '../../controllers/reviews/deleteReviews';
import { upload } from '../../middleware/multer';

const reviewRouter = Router();

reviewRouter.get('/', getReviews);
reviewRouter.post(
  '/',
  upload.fields([{ name: 'image', maxCount: 3 }]),
  postReview
);
reviewRouter.patch('/:id', patchReview);
reviewRouter.delete('/:id', deleteReview);

export default reviewRouter;

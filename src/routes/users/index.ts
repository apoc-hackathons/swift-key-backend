import { Router } from 'express';
import { postUser } from '../../controllers/users/postuser';
import { checkInUser } from '../../controllers/users/checkInUser';
import { checkOutUser } from '../../controllers/users/checkOutUser';

const userRouter = Router();

userRouter.post('/', postUser);
userRouter.post('/checkIn/:uid', checkInUser);
userRouter.post('/checkOut/:uid', checkOutUser);

export default userRouter;

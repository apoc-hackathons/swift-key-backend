import { User } from '../../models/users';
import { Response, Request } from 'express';
import { serverError } from '../../utils/errorHandler';
import { logger } from '../../utils/logger';
import { generateUserToken } from '../../middleware/token';

export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      uid,
      email,
      emailVerified,
      displayName,
      isAnonymous,
      photoURL,
      providerData,
      stsTokenManager,
      createdAt,
      lastLoginAt,
      apiKey,
      appName
    } = req.body;
    const user = await User.findOne({ uid: uid });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      logger.info('User already exists');
    }
    const newUser = new User({
      uid,
      email,
      emailVerified,
      displayName,
      isAnonymous,
      photoURL,
      providerData,
      stsTokenManager,
      createdAt,
      lastLoginAt,
      apiKey,
      appName
    });

    const token = await generateUserToken(newUser);

    await newUser.save().then((user) => {
      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .send({ msg: 'User saved successfully', data: user });

      logger.info('User saved successfully', user);
    });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};

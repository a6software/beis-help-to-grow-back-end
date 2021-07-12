import { Request, Response } from 'express';
import { ErrorResponse, SignInSuccessResponse, UserService } from '../../types';
import { hasAccess } from '../../lib/security/authentication';
import { generateAccessToken } from '../../lib/security/access-token';

const genericSignInErrorResponseBody = {
  success: false,
  data: {
    errors: [
      {
        message: 'This username and password combination was not recognised.',
        path: ['root'],
        type: 'XXXXXXXXXXXX',
        context: {
          value: '',
          label: 'root',
          key: 'root',
        },
      },
    ],
  },
};

const post =
  (userService: UserService) =>
  async (req: Request, res: Response): Promise<ErrorResponse | SignInSuccessResponse> => {
    const { email, password } = req.body;
    console.log(`BE`, { email, password });

    res.status(401);

    let userLookupResponse;
    try {
      userLookupResponse = await userService.findUserByEmailAddress(email);
    } catch (e) {
      req.log.error('Failed at userService.findUserByEmailAddress(email)');
      res.json(genericSignInErrorResponseBody);
      return;
    }

    if (!userLookupResponse.success) {
      req.log.error('Failed at !userLookupResponse.success');
      res.json(genericSignInErrorResponseBody);
      return;
    }

    if (false === (await hasAccess(password, userLookupResponse.data.user.password))) {
      req.log.error('Failed at password hash check');
      res.json(genericSignInErrorResponseBody);
      return;
    }

    res.status(200);
    res.json({
      success: true,
      data: {
        token: generateAccessToken(userLookupResponse.data.user.email),
        user: { email: userLookupResponse.data.user.email },
      },
    });
  };

export default {
  post,
};

import { Request, Response } from 'express';
import { schema as createAccountSchema } from '../../validation/schema/create-account';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { CreateAccountSuccessResponse, ErrorResponse, UserService } from '../../types';

const post =
  (userService: UserService) =>
  async (req: Request, res: Response): Promise<ErrorResponse | CreateAccountSuccessResponse> => {
    const { error } = createAccountSchema.validate(req.body, joiValidationOptions);

    if (error) {
      res.status(400);
      res.json({
        success: false,
        data: {
          errors: error.details,
        },
      });
      return;
    }

    // const outcome = await userService.createUser(email, password);
    //
    // if (!outcome.success) {
    //   res.status(400);
    //   res.json({
    //     success: false,
    //     data: outcome.data,
    //   });
    //   return;
    // }
    //
    // res.status(201);
    // res.json({ success: true, data: { email, jwt: generateAccessToken(email) } });
    res.sendStatus(200);
  };

export default {
  post,
};

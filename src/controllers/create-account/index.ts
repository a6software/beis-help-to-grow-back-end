import { Request, Response } from 'express';
import { schema as createAccountSchema } from '../../validation/schema/create-account';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { UserService, ValidationError } from '../../types';

const post = (userService: UserService) => async (req: Request, res: Response) => {
  const { email, password, repeatedPassword } = req.body;

  const { error } = createAccountSchema.validate(
    { email, password, repeatedPassword },
    joiValidationOptions,
  );

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  const outcome = await userService.createUser(email, password);

  if (!outcome.success) {
    res.status(400);
    res.json({
      success: false,
      data: {
        msg: 'Sorry, there was an error creating your user account at this time.',
      },
    });
    return;
  }

  res.status(201);
  res.json({ success: true, data: { email } });
};

export default {
  post,
};

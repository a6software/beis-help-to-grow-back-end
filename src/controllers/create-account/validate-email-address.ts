import { Request, Response } from 'express';
import { schema as validateEmailSchema } from '../../validation/schema/validate-email';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post = async (req: Request, res: Response) => {
  const { email } = req.body;

  const { error } = validateEmailSchema.validate({ email }, joiValidationOptions);

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

  res.status(200);
  res.json({ success: true, data: { email } });
};

export default {
  post,
};

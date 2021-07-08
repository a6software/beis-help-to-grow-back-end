import { Request, Response } from 'express';
import { schema as validateEmailSchema } from '../../validation/schema/validate-email';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { email } = req.body;

  const { error } = validateEmailSchema.validate({ email }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { email } });
};

export default {
  post,
};

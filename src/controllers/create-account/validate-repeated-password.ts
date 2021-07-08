import { Request, Response } from 'express';
import { schema as validateRepeatedPasswordSchema } from '../../validation/schema/validate-repeated-password';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { password, repeatedPassword } = req.body;

  const { error } = validateRepeatedPasswordSchema.validate(
    { password, repeatedPassword },
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

  res.status(200);
  res.json({ success: true });
};

export default {
  post,
};

import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateRatingsSchema } from '../../validation/schema/eligibility/validate-ratings';

const post = async (req: Request, res: Response) => {
  const { ratings } = req.body;

  const { error } = validateRatingsSchema.validate({ ratings }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details,
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { ratings } });
};

export default {
  post,
};

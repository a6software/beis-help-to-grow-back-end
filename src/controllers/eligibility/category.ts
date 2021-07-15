import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateCategorySchema } from '../../validation/schema/eligibility/validate-category';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { category } = req.body;

  const { error } = validateCategorySchema.validate({ category }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { category } });
};

export default {
  post,
};

import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateAccessibilitySchema } from '../../validation/schema/eligibility/validate-accessibility';

const post = async (req: Request, res: Response) => {
  const { accessibility } = req.body;

  const { error } = validateAccessibilitySchema.validate({ accessibility }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details,
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { accessibility } });
};

export default {
  post,
};

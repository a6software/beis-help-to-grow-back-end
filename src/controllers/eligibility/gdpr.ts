import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateGdprSchema } from '../../validation/schema/eligibility/validate-gdpr';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { gdpr } = req.body;

  const { error } = validateGdprSchema.validate({ gdpr }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { gdpr } });
};

export default {
  post,
};

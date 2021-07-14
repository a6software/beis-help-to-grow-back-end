import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateMakingTaxDigitalSchema } from '../../validation/schema/eligibility/validate-making-tax-digital';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { makingTaxDigital } = req.body;

  const { error } = validateMakingTaxDigitalSchema.validate({ makingTaxDigital }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { makingTaxDigital } });
};

export default {
  post,
};

import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateMtdWarningSchema } from '../../validation/schema/eligibility/validate-mtd-warning';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { mtdWarning } = req.body;

  const { error } = validateMtdWarningSchema.validate({ mtdWarning }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { mtdWarning } });
};

export default {
  post,
};

import { Request, Response } from 'express';
import { schema as validateTermsAndConditionsSchema } from '../../validation/schema/validate-terms-and-conditions';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post = async (req: Request, res: Response) => {
  const { termsAndConditions } = req.body;

  const { error } = validateTermsAndConditionsSchema.validate(
    { termsAndConditions },
    joiValidationOptions,
  );

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details,
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { termsAndConditions: true } });
};

export default {
  post,
};

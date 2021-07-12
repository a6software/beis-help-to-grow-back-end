import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateEligibilityCompleteSchema } from '../../validation/schema/eligibility/validate-eligibility-complete';

const post = async (req: Request, res: Response) => {
  const { eligibilityComplete } = req.body;

  const { error } = validateEligibilityCompleteSchema.validate(
    { eligibilityComplete },
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
  res.json({ success: true, data: { eligibilityComplete } });
};

export default {
  post,
};

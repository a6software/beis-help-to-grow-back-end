import { Request, Response } from 'express';
import { schema as validateTermsAndConditionsSchema } from '../../validation/schema/validate-terms-and-conditions';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post = async (req: Request, res: Response) => {
  const { consentToTermsAndConditions, consentToDataSharing } = req.body;
  console.log(`{ consentToTermsAndConditions, consentToDataSharing }`, {
    consentToTermsAndConditions,
    consentToDataSharing,
  });

  const { error } = validateTermsAndConditionsSchema.validate(
    { consentToTermsAndConditions, consentToDataSharing },
    joiValidationOptions,
  );

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: {
        errors: error.details,
      },
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { consentToTermsAndConditions, consentToDataSharing } });
};

export default {
  post,
};

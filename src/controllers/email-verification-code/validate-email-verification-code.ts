import { Request, Response } from 'express';
import { EmailVerificationService } from '../../types';
import { schema as validateEmailVerificationCodeSchema } from '../../validation/schema/validate-email-verification-code';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post =
  (emailVerificationService: EmailVerificationService) => async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body;

    const { error } = validateEmailVerificationCodeSchema.validate(
      { email, verificationCode },
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

    const outcome = await emailVerificationService.validateEmailVerificationCode(
      email,
      verificationCode,
    );
    console.log(`outcome`, outcome);

    if (!outcome.success) {
      res.status(400);
      res.json({
        success: false,
        data: outcome.data,
      });
      return;
    }

    res.status(201);
    res.json({ success: true, data: { email } });
  };

export default {
  post,
};

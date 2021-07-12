import { Request, Response } from 'express';
import { EmailVerificationService } from '../../types';
import { schema as createEmailVerificationCodeSchema } from '../../validation/schema/create-email-verification-code';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post =
  (emailVerificationService: EmailVerificationService) => async (req: Request, res: Response) => {
    const { email } = req.body;

    const { error } = createEmailVerificationCodeSchema.validate({ email }, joiValidationOptions);

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

    const outcome = await emailVerificationService.createEmailVerificationCode(email);

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

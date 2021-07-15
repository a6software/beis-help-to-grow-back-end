import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateonlinePurchaseSchema } from '../../validation/schema/eligibility/validate-online-purchase';
import { ValidationError } from '../../types';

const post = async (req: Request, res: Response) => {
  const { onlinePurchase } = req.body;

  const { error } = validateonlinePurchaseSchema.validate({ onlinePurchase }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details.map((err: ValidationError) => err),
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { onlinePurchase } });
};

export default {
  post,
};

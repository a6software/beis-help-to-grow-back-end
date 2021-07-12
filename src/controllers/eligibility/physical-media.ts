import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validatePhysicalMediaSchema } from '../../validation/schema/eligibility/validate-physical-media';

const post = async (req: Request, res: Response) => {
  const { physicalMedia } = req.body;

  const { error } = validatePhysicalMediaSchema.validate({ physicalMedia }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details,
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { physicalMedia } });
};

export default {
  post,
};

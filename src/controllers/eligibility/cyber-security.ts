import { Request, Response } from 'express';
import { options as joiValidationOptions } from '../../validation/default-validation-options';
import { schema as validateCyberSecuritySchema } from '../../validation/schema/eligibility/validate-cyber-security';

const post = async (req: Request, res: Response) => {
  const { cyberSecurity } = req.body;

  const { error } = validateCyberSecuritySchema.validate({ cyberSecurity }, joiValidationOptions);

  if (error) {
    res.status(400);
    res.json({
      success: false,
      data: error.details,
    });
    return;
  }

  res.status(200);
  res.json({ success: true, data: { cyberSecurity } });
};

export default {
  post,
};

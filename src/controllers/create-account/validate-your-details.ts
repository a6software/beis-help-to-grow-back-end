import { Request, Response } from 'express';
import { schema as validateYourDetailsSchema } from '../../validation/schema/validate-your-details';
import { options as joiValidationOptions } from '../../validation/default-validation-options';

const post = async (req: Request, res: Response) => {
  const { companyWebsiteUrl, fullName, phoneNumber, positionInCompany, workEmailAddress } =
    req.body;

  const { error } = validateYourDetailsSchema.validate(
    { companyWebsiteUrl, fullName, phoneNumber, positionInCompany, workEmailAddress },
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
  res.json({ success: true, data: { workEmailAddress } });
};

export default {
  post,
};

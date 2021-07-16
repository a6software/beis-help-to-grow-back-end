import Joi from 'joi';
import { schema as validateCompanyHouseInformation } from './validate-companies-house-information';
import { schema as validateEmailVerificationCode } from './validate-email-verification-code';
import { schema as validateRepeatedPassword } from './validate-repeated-password';
import { schema as validateTermsAndConditions } from './validate-terms-and-conditions';
import { schema as validateYourDetails } from './validate-your-details';

export const schema = Joi.object({
  company: validateCompanyHouseInformation,
  email: validateEmailVerificationCode,
  password: validateRepeatedPassword,
  termsAndConditions: validateTermsAndConditions,
  yourDetails: validateYourDetails,
}).required();

export default {
  schema,
};

import Joi from 'joi';
import { schema as validateEmailVerificationCode } from './validate-email-verification-code';
import { schema as validateRepeatedPassword } from './validate-repeated-password';

export const schema = Joi.object({
  // company: validateCompanyHouseInformation,
  // email: validateEmailVerificationCode,
  // password: validateRepeatedPassword,
  // termsAndConditions: validateTermsAndConditions,
  // yourDetails: validateYourDetails,

  email: validateEmailVerificationCode,
  password: validateRepeatedPassword,
}).required();

export default {
  schema,
};

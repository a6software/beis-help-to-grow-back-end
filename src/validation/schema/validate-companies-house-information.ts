import Joi from 'joi';

import companyName from '../rules/company-name';
import companyNumber from '../rules/company-number';
import companyStatus from '../rules/company-status';
import registeredAddress from '../rules/company-registered-address';
import postalCode from '../rules/company-postal-code';

export const schema = Joi.object({
  companyName: companyName(),
  companyNumber: companyNumber(),
  companyStatus: companyStatus(),
  registeredAddress: registeredAddress(),
  postalCode: postalCode(),
}).required();

export default {
  schema,
};

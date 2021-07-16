import Joi from 'joi';
import consentToDataSharing from '../rules/consent-to-data-sharing';
import consentToTermsAndConditions from '../rules/consent-to-terms-and-conditions';

export const schema = Joi.object({
  consentToDataSharing: consentToDataSharing(),
  consentToTermsAndConditions: consentToTermsAndConditions(),
}).required();

export default {
  schema,
};

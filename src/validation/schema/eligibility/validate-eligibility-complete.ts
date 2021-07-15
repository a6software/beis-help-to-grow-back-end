import Joi from 'joi';
import eligibilityComplete from '../../rules/eligibility-complete';

export const schema = Joi.object({
  eligibilityComplete: eligibilityComplete(),
});

export default {
  schema,
};

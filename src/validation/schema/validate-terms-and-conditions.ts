import Joi from 'joi';
import termsAndConditions from '../rules/terms-and-conditions';

export const schema = Joi.object({
  termsAndConditions: termsAndConditions(),
});

export default {
  schema,
};

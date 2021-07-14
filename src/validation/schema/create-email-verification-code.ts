import Joi from 'joi';
import email from '../rules/email';

export const schema = Joi.object({
  email: email(),
});

export default {
  schema,
};

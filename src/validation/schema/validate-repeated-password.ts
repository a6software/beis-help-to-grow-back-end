import Joi from 'joi';
import password from '../rules/password';
import repeatedPassword from '../rules/repeated-password';

export const schema = Joi.object({
  password: password(),
  repeatedPassword: repeatedPassword(),
});

export default {
  schema,
};

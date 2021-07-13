import Joi from 'joi';
import cyberSecurity from '../../rules/cyber-security';

export const schema = Joi.object({
  cyberSecurity: cyberSecurity(),
});

export default {
  schema,
};

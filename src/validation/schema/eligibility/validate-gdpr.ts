import Joi from 'joi';
import gdpr from '../../rules/gdpr';

export const schema = Joi.object({
  gdpr: gdpr(),
});

export default {
  schema,
};

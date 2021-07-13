import Joi from 'joi';
import accessibility from '../../rules/accessibility';

export const schema = Joi.object({
  accessibility: accessibility(),
});

export default {
  schema,
};

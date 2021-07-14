import Joi from 'joi';
import category from '../../rules/category';

export const schema = Joi.object({
  category: category(),
});

export default {
  schema,
};

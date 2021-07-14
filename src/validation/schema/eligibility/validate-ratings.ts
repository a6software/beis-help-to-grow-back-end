import Joi from 'joi';
import ratings from '../../rules/ratings';

export const schema = Joi.object({
  ratings: ratings(),
});

export default {
  schema,
};

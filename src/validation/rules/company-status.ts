import Joi from 'joi';

export default () =>
  Joi.string()
    .pattern(/^active$/)
    .required();

import Joi from 'joi';

export default () => Joi.boolean().invalid(false).required();

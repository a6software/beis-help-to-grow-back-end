import Joi from 'joi';

export default () => Joi.string().valid(Joi.ref('password')).required();

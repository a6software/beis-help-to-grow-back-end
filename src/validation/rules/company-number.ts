import Joi from 'joi';

export default () => Joi.string().min(2).max(50).required();

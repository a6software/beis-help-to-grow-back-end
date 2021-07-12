import Joi from 'joi';

export default () => Joi.string().min(2).max(255).required();

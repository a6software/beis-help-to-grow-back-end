import Joi from 'joi';

export default () => Joi.string().min(1).max(255).required();
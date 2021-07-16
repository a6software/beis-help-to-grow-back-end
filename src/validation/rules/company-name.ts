import Joi from 'joi';

export default () => Joi.string().min(2).max(500).required();

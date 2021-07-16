import Joi from 'joi';

export default () => Joi.string().min(1).max(500).required();

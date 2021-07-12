import Joi from 'joi';

export default () => Joi.string().max(255).uri().required();

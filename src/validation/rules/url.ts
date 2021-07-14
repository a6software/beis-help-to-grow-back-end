import Joi from 'joi';

export default () => Joi.string().max(50).uri().required();

import Joi from 'joi';

export default () => Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required();

import Joi from 'joi';

const joi = Joi.extend(require('joi-phone-number'));

export default () => joi.string().phoneNumber({ defaultCountry: 'GB' });

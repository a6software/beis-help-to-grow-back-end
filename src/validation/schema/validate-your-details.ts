import Joi from 'joi';
import email from '../rules/email';
import fullName from '../rules/full-name';
import phoneNumber from '../rules/phone-number';
import positionInCompany from '../rules/position-in-company';
import url from '../rules/url';

export const schema = Joi.object({
  companyWebsiteUrl: url(),
  fullName: fullName(),
  phoneNumber: phoneNumber(),
  positionInCompany: positionInCompany(),
  workEmailAddress: email(),
}).required();

export default {
  schema,
};

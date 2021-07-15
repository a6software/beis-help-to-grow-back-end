import Joi from 'joi';
import makingTaxDigital from '../../rules/making-tax-digital';

export const schema = Joi.object({
  makingTaxDigital: makingTaxDigital(),
});

export default {
  schema,
};

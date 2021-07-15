import Joi from 'joi';
import onlinePurchase from '../../rules/online-purchase';

export const schema = Joi.object({
  onlinePurchase: onlinePurchase(),
});

export default {
  schema,
};

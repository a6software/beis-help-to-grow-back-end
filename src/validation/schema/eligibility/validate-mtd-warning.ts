import Joi from 'joi';
import mtdWarning from '../../rules/mtd-warning';

export const schema = Joi.object({
  mtdWarning: mtdWarning(),
});

export default {
  schema,
};

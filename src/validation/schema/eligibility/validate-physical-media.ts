import Joi from 'joi';
import physicalMedia from '../../rules/physical-media';

export const schema = Joi.object({
  physicalMedia: physicalMedia(),
});

export default {
  schema,
};

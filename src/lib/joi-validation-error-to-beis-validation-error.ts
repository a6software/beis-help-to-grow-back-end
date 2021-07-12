import { BEISValidationError, JoiValidationError } from '../types';

export const joiValidationErrorToBEISValidationError = (
  validationError: JoiValidationError,
): BEISValidationError => validationError;

export default {
  joiValidationErrorToBEISValidationError,
};

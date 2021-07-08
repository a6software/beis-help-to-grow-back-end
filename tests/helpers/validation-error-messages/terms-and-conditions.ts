import { isRequiredError, mustBeAValidValueError, mustBeBooleanError } from './generic';

const FIELD_NAME = 'termsAndConditions';

export const termsAndConditionsIsRequiredError = isRequiredError(FIELD_NAME);

export const termsAndConditionsMustBeBooleanError = (givenValue: string | number | boolean) =>
  mustBeBooleanError(FIELD_NAME, givenValue);

export const termsAndConditionsMustBeAValidValueError = (givenValue: string | number | boolean) =>
  mustBeAValidValueError(FIELD_NAME, givenValue);

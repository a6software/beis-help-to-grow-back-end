import { isRequiredError, mustBeAValidValueError, mustBeBooleanError } from './generic';

const FIELD_NAME = 'consentToTermsAndConditions';

export const consentToTermsAndConditionsIsRequiredError = isRequiredError(FIELD_NAME);

export const consentToTermsAndConditionsMustBeBooleanError = (
  givenValue: string | number | boolean,
) => mustBeBooleanError(FIELD_NAME, givenValue);

export const consentToTermsAndConditionsMustBeAValidValueError = (
  givenValue: string | number | boolean,
) => mustBeAValidValueError(FIELD_NAME, givenValue);

import { isRequiredError, mustBeAValidValueError, mustBeBooleanError } from './generic';

const FIELD_NAME = 'consentToDataSharing';

export const consentToDataSharingIsRequiredError = isRequiredError(FIELD_NAME);

export const consentToDataSharingMustBeBooleanError = (givenValue: string | number | boolean) =>
  mustBeBooleanError(FIELD_NAME, givenValue);

export const consentToDataSharingMustBeAValidValueError = (givenValue: string | number | boolean) =>
  mustBeAValidValueError(FIELD_NAME, givenValue);

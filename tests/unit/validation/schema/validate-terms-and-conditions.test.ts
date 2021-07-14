import { schema as validateTermsAndConditionsSchema } from '../../../../src/validation/schema/validate-terms-and-conditions';
import { options as joiValidationOptions } from '../../../../src/validation/default-validation-options';
import { ValidationError } from 'joi';

const expectedValidationErrorMessages = (...strings: string[]): ValidationError =>
  new ValidationError(strings.join('. '), {}, {});

describe('validation/schema/validate-terms-and-conditions', () => {
  [
    {
      description: 'consentToDataSharing must be true',
      given: {
        consentToTermsAndConditions: true,
        consentToDataSharing: false,
      },
      expected: expectedValidationErrorMessages('"consentToDataSharing" contains an invalid value'),
    },
    {
      description: 'consentToTermsAndConditions must be true',
      given: {
        consentToTermsAndConditions: false,
        consentToDataSharing: true,
      },
      expected: expectedValidationErrorMessages(
        '"consentToTermsAndConditions" contains an invalid value',
      ),
    },
    {
      description: 'all invalid',
      given: {
        consentToTermsAndConditions: false,
        consentToDataSharing: false,
      },
      expected: expectedValidationErrorMessages(
        '"consentToDataSharing" contains an invalid value',
        '"consentToTermsAndConditions" contains an invalid value',
      ),
    },
  ].forEach(({ description, given, expected }) => {
    it(`should be invalid - ${description}`, () => {
      const { error } = validateTermsAndConditionsSchema.validate(given, joiValidationOptions);

      expect(error).toEqual(expected);
    });
  });

  it('should have a happy path', () => {
    const consentToTermsAndConditions = true;
    const consentToDataSharing = true;

    const { error } = validateTermsAndConditionsSchema.validate(
      { consentToTermsAndConditions, consentToDataSharing },
      joiValidationOptions,
    );

    expect(error).toBeUndefined();
  });
});

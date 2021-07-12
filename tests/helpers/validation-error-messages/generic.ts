export const isRequiredError = (fieldName: string) => ({
  message: `"${fieldName}" is required`,
  path: [fieldName],
  type: 'any.required',
  context: {
    label: fieldName,
    key: fieldName,
  },
});

export const mustBeBooleanError = (fieldName: string, givenValue: string | number | boolean) => ({
  message: `"${fieldName}" must be a boolean`,
  path: [fieldName],
  type: 'boolean.base',
  context: {
    label: fieldName,
    value: givenValue,
    key: fieldName,
  },
});

export const mustBeAValidValueError = (
  fieldName: string,
  givenValue: string | number | boolean,
  type = 'any.invalid',
) => ({
  message: `"${fieldName}" contains an invalid value`,
  path: [fieldName],
  type,
  context: {
    invalids: [givenValue],
    label: fieldName,
    value: givenValue,
    key: fieldName,
  },
});

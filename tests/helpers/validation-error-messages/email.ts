export const emailIsNotValidError = (fieldName: string, badEmail: string) => ({
  message: `"${fieldName}" must be a valid email`,
  path: [fieldName],
  type: 'string.email',
  context: {
    value: badEmail,
    invalids: [badEmail],
    label: fieldName,
    key: fieldName,
  },
});

export default {
  emailIsNotValidError,
};

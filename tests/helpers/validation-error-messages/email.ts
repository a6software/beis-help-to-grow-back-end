import { isRequiredError } from './generic';

export const emailIsRequiredError = isRequiredError('email');

export const emailIsNotValidError = (badEmail: string) => ({
  message: '"email" must be a valid email',
  path: ['email'],
  type: 'string.email',
  context: {
    value: badEmail,
    invalids: [badEmail],
    label: 'email',
    key: 'email',
  },
});

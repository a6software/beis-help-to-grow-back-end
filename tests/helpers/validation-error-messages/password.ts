import { isRequiredError } from './generic';

export const passwordIsRequiredError = isRequiredError('password');

export const repeatedPasswordIsRequiredError = isRequiredError('repeatedPassword');

export const passwordCannotBeEmptyError = {
  message: '"password" is not allowed to be empty',
  path: ['password'],
  type: 'string.empty',
  context: {
    label: 'password',
    value: '',
    key: 'password',
  },
};

export const passwordDoesNotMatchExpectedPatternError = (plainPassword: string) => ({
  message: `"password" with value "${plainPassword}" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/`,
  path: ['password'],
  type: 'string.pattern.base',
  context: {
    regex: {},
    value: plainPassword,
    label: 'password',
    key: 'password',
  },
});

export const repeatedPasswordMustBeRefPasswordError = (givenPlainPasswordValue: string) => ({
  context: {
    key: 'repeatedPassword',
    label: 'repeatedPassword',
    valids: [
      {
        adjust: null as any,
        ancestor: 1,
        depth: 1,
        display: 'ref:password',
        in: false,
        iterables: null as any,
        key: 'password',
        map: null as any,
        path: ['password'],
        root: 'password',
        separator: '.',
        type: 'value',
      },
    ],
    value: givenPlainPasswordValue,
  },
  message: '"repeatedPassword" must be [ref:password]',
  path: ['repeatedPassword'],
  type: 'any.only',
});

export default {
  passwordIsRequiredError,
  repeatedPasswordIsRequiredError,
  passwordCannotBeEmptyError,
  passwordDoesNotMatchExpectedPatternError,
  repeatedPasswordMustBeRefPasswordError,
};

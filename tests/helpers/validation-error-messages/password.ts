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
  message: `\"password\" with value \"${plainPassword}\" fails to match the required pattern: /^[a-zA-Z0-9]{6,30}$/`,
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
        // @ts-ignore
        adjust: null,
        ancestor: 1,
        depth: 1,
        display: 'ref:password',
        in: false,
        // @ts-ignore
        iterables: null,
        key: 'password',
        // @ts-ignore
        map: null,
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

import { hasAccess, hashPassword } from '../../../../src/lib/security/authentication';

describe('lib/security/authentication', () => {
  [
    {
      description: 'A simple matching password example',
      given: 'abc-123',
      known: 'abc-123',
      expected: true,
    },
    {
      description: 'A simple not matching password example',
      given: 'a password goes here',
      known: 'a different password is provided',
      expected: false,
    },
    {
      description: 'Complex password example',
      given: 'x6BuXMF@b&%tPcDTchEdcGT88Mc@n^XrkD&S69flLrih%cNwzcdhrL0&cK$!Wl',
      known: 'x6BuXMF@b&%tPcDTchEdcGT88Mc@n^XrkD&S69flLrih%cNwzcdhrL0&cK$!Wl',
      expected: true,
    },
  ].forEach(({ description, given, known, expected }) => {
    it(`should compare passwords - ${description}`, async () => {
      const hashedPassword = await hashPassword(known);
      expect(await hasAccess(given, hashedPassword)).toEqual(expected);
    });
  });
});

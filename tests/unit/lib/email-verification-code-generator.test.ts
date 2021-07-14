import emailVerificationCodeGenerator from '../../../src/lib/email-verification-code-generator';

describe('lib/email-verification-code-generator', () => {
  it('should generate a uuid4', () => {
    for (let x = 0; x < 100; x += 1) {
      expect(emailVerificationCodeGenerator()).toMatch(/^([a-z]|[A-Z]|[0-9]|[-]){36}$/);
    }
  });
});

import requestIdGenerator from '../../src/lib/request-id-generator';

describe('lib/request-id-generator', () => {
  it('should generate a uuid4', () => {
    for (let x = 0; x < 100; ++x) {
      expect(requestIdGenerator()).toMatch(/^([a-z]|[A-Z]|[0-9]|[-]){36}$/);
    }
  });
});

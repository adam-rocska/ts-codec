import hello from '#hello';

describe('Hello', () => {
  it('Should greet me', () => {
    expect(hello('Adam')).toBe('Hello, Adam.');
  });
});

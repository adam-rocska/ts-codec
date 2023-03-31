import {urlSearchParams} from '#urlSearchParams';
import {string, number, boolean} from '#json';
import {CorruptPayload} from '#CorruptPayload';

describe('urlSearchParams', () => {
  const testCodec = urlSearchParams({
    firstName: string,
    lastName: string,
    age: number,
    isAdult: boolean,
  });
  describe('#decode', () => {
    it('should decode a string into an object', () => {
      const result = testCodec.decode(
        'firstName=John&lastName=Doe&age=32&isAdult=true'
      );
      expect(result).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
        isAdult: true,
      });
    });

    it('should decode a string into an object with missing keys', () => {
      const result = testCodec.decode('firstName=John&age=32&isAdult=true');
      expect(result).toEqual({
        firstName: 'John',
        age: 32,
        isAdult: true,
      });
    });

    it('should decode a string into an object with extra keys', () => {
      const result = testCodec.decode(
        'firstName=John&lastName=Doe&age=32&isAdult=true&extra=foo'
      );
      expect(result).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
        isAdult: true,
      });
    });

    it('should rethrow the error coming from an invalid value', () => {
      expect(() =>
        testCodec.decode('firstName=John&age=NaN&isAdult=foo')
      ).toThrow(new CorruptPayload(number, 'decode', 'NaN'));
    });
  });
  describe('#encode', () => {
    it('should encode an object into a string', () => {
      const result = testCodec.encode({
        firstName: 'John',
        lastName: 'Doe',
        age: 32,
        isAdult: true,
      });
      expect(result).toEqual('firstName=John&lastName=Doe&age=32&isAdult=true');
    });
  });
});

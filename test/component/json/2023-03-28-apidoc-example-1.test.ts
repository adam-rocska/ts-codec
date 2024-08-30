import {json} from '!src/index';

describe("[2023-03-18] API Documentation's example validation.", () => {
  test('should do what it promises.', () => {
    type Person = {
      firstName: string;
      lastName: string;
      age: number;
      contact?: {
        mail: string;
        phone: string;
      };
    };

    const person = json.record<Person>({
      firstName: json.string,
      lastName: json.string,
      age: json.number,
      contact: json.optional(
        json.record({
          mail: json.string,
          phone: json.string,
        })
      ),
    });

    const source = {
      firstName: 'Adam',
      lastName: 'Rocska',
      age: 30,
    };
    const rawString: string = person.encode(source);

    const decoded: Person = person.decode(rawString);

    expect(decoded).toMatchObject(source);
  });
});

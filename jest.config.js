/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^#(.*)$': '<rootDir>/codec/$1',
    '^!unit/(.*)$': '<rootDir>/test/unit/$1',
    '^!system/(.*)$': '<rootDir>/test/system/$1',
  },
};

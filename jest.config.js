/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^#(.*)$': '<rootDir>/codec/$1',
    '^!unit/(.*)$': '<rootDir>/test/unit/$1',
    '^! component/(.*)$': '<rootDir>/test/ component/$1',
  },
  coverageThreshold: {
    // TODO: This config is shit. We need to control test layers separately!
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

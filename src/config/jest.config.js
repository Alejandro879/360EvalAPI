
module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    coverageDirectory: './coverage',
    testMatch: ['**/*.test.js'],
    setupFiles: ["./config/jest.setup.js"],
    moduleNameMapper: {
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1', 
    },
  };
  
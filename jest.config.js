module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',  // This tells Jest to use ts-jest to transform TypeScript files
    },
  };
  
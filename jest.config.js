module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The root directory that Jest should use to look for tests
  rootDir: './test',

  // The file extensions that Jest should look for when searching for tests
  testMatch: ['**/*.test.js'],

  // The reporters that Jest should use to report test results
  reporters: ['default'],

  // The timeout in milliseconds that Jest should wait for a test to complete
  testTimeout: 15000,
  coverageDirectory: 'coverage',
};

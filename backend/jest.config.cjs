// jest.config.cjs
module.exports = {
  testEnvironment: 'node',

  // ✅ Cherche les tests au même endroit
  testMatch: [
    '**/tests/**/*.test.js',
],

// ✅ Exclut les .test.js du build production
collectCoverageFrom: [
  'src/**/*.js',
  '!tests/*.test.js',
  '!src/server.js',
  '!src/config/**',
],

coverageThreshold: {
  global: {
    lines: 60,
      functions: 60,
      branches: 60,
  }
},

testTimeout: 10000,
  verbose: true,
};
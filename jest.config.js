module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/(config|public)/'
  ],
  testRegex: '((\\.|/)(test|spec))\\.jsx?$',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.*', '!**/**/*.json'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './api',
    './config',
    './coverage',
    '<rootDir>/src/pages',
    '.config.js$',
    '.eslintrc.js',
    '.babel.config.js',
    'modules/index.js',
    'modules/sagas.js',
    'modules/store.js',
    '<rootDir>/src/index.js',
    '<rootDir>/server.js',
    './public',
    '_snapshots_'
  ],
  coverageReporters: ['html'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTest.js'],
  testEnvironment: 'jsdom'
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    roots: ['<rootDir>/tests'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts', '!src/entity/**'],
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  };
  
export const config = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@main': ['<rootDir>/src/index.ts'],
    '@di/(.*)$': ['<rootDir>/src/di/$1'],
    '@modules/(.*)$': ['<rootDir>/src/modules/$1'],
    '@shared/(.*)$': ['<rootDir>/src/shared/$1'],
  },
  modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/lib/', '<rootDir>/coverage/'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\lib\\\\'],
  transform: {
    '^.+\\.(ts)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  transformIgnorePatterns: ['\\\\node_modules\\\\'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};

export default config;

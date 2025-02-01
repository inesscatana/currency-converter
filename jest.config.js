/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleDirectories: ['node_modules', 'src'],
  watchman: false,
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: './tsconfig.app.json', isolatedModules: true },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!@uphold/uphold-sdk-javascript)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

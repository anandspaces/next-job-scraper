import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  // Alias for imports
    '\\.(css|scss|sass|less)$': 'jest-transform-stub', // Stub styles
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub', // Stub images
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};

export default createJestConfig(customJestConfig);

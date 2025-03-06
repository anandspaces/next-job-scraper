const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Make sure this points to your Next.js app root
});

const customJestConfig = {  // ✅ Ensure this variable is declared before being used
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '^@/components/(.*)$': '<rootDir>/components/$1', // Adjust based on your project structure
  },
};

module.exports = createJestConfig(customJestConfig); // ✅ Use the correctly defined variable

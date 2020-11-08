module.exports = {
  // collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  // testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/cssTransform.js',
  },
  // transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  // moduleNameMapper: {
  // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  // },
}

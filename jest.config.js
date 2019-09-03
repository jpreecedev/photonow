module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["<rootDir>/server/**/*.spec.{ts,tsx}"],
  setupFiles: ["<rootDir>/node_modules/regenerator-runtime/runtime"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
}

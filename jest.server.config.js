module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/server"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
}

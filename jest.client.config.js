module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  },
  roots: ["<rootDir>/components", "<rootDir>/layouts", "<rootDir>/store", "<rootDir>/utils"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
}

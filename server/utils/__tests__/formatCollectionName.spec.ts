import { formatCollectionName } from "../collection"

describe("FormatCollectionName tests", () => {
  it("should format the name 'My Test Collection' correctly", () => {
    const name = "My Test Collection"
    const expected = "my-test-collection"

    const result = formatCollectionName(name)

    expect(result).toEqual(expected)
  })

  it("should format the name ' My Test Collection' correctly", () => {
    const name = " My Test Collection "
    const expected = "my-test-collection"

    const result = formatCollectionName(name)

    expect(result).toEqual(expected)
  })

  it("should format the name 'My !@£$%^&*()_+=;:'|\"' Collection' correctly", () => {
    const name = "My !@£$%^&*()_+=;:'|\"' Collection"
    const expected = "my--collection"

    const result = formatCollectionName(name)

    expect(result).toEqual(expected)
  })
})

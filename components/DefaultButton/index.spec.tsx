import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { DefaultButton } from "."

describe("<DefaultButton /> tests", () => {
  it("should render a default button", () => {
    const buttonTestId = "button"
    const buttonContentTestId = "button-content"

    const { getByTestId } = render(
      <DefaultButton>
        <span data-testid={buttonContentTestId}>Some button content</span>
      </DefaultButton>
    )

    expect(getByTestId(buttonTestId)).toMatchSnapshot()
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-contained")
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-containedPrimary")
    expect(getByTestId(buttonContentTestId)).toBeInTheDocument()
  })

  it("should render a large button", () => {
    const buttonTestId = "button"
    const buttonContentTestId = "button-content"

    const { getByTestId } = render(
      <DefaultButton size="large">
        <span data-testid={buttonContentTestId}>Some button content</span>
      </DefaultButton>
    )

    expect(getByTestId(buttonTestId)).toMatchSnapshot()
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-contained")
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-containedPrimary")
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-sizeLarge")

    expect(getByTestId(buttonContentTestId)).toBeInTheDocument()
  })

  it("should render a secondary button", () => {
    const buttonTestId = "button"
    const buttonContentTestId = "button-content"

    const { getByTestId } = render(
      <DefaultButton color="secondary">
        <span data-testid={buttonContentTestId}>Some button content</span>
      </DefaultButton>
    )

    expect(getByTestId(buttonTestId)).toMatchSnapshot()
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-contained")
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-containedSecondary")

    expect(getByTestId(buttonContentTestId)).toBeInTheDocument()
  })

  it("should render an outlined secondary button", () => {
    const buttonTestId = "button"
    const buttonContentTestId = "button-content"

    const { getByTestId } = render(
      <DefaultButton color="secondary" variant="outlined">
        <span data-testid={buttonContentTestId}>Some button content</span>
      </DefaultButton>
    )

    expect(getByTestId(buttonTestId)).toMatchSnapshot()
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-outlined")
    expect(getByTestId(buttonTestId)).toHaveClass("MuiButton-outlinedSecondary")

    expect(getByTestId(buttonContentTestId)).toBeInTheDocument()
  })
})

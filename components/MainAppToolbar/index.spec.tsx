import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Router from "next/router"

import { PictureItem } from "../../global"
import { MainAppToolbarComponent } from "./index"

jest.mock("next/router", () => {
  return []
})

describe("<MainAppToolbarComponent /> tests", () => {
  beforeEach(() => {
    // @ts-ignore
    Router.splice(0)
  })

  it("should render with the correct number of basket items", () => {
    const appbarBadgeTestId = "appbar-basket-badge"
    const picture: PictureItem = {
      momentId: "momentId",
      label: "label",
      url: "url",
      price: 123,
      addedToBasket: false
    }
    const pictures: PictureItem[] = [
      { ...picture, addedToBasket: true },
      { ...picture, addedToBasket: true },
      { ...picture }
    ]

    const { getByTestId } = render(<MainAppToolbarComponent pictures={pictures} />)

    expect(getByTestId(appbarBadgeTestId)).toMatchSnapshot()
  })

  it("should redirect to the login page when clicking account button", () => {
    const accountButtonTestId = "appbar-account-button"
    const { getByTestId } = render(<MainAppToolbarComponent />)

    fireEvent.click(getByTestId(accountButtonTestId))

    expect(Router.push).toHaveLength(1)
    expect(Router[0]).toEqual("/login")
  })

  it("should redirect to getting started when clicking account button and basket is empty", () => {
    const accountButtonTestId = "appbar-basket-button"

    const { getByTestId } = render(<MainAppToolbarComponent />)

    fireEvent.click(getByTestId(accountButtonTestId))

    expect(Router.push).toHaveLength(1)
    expect(Router[0]).toEqual("/getting-started")
  })

  it("should redirect to the select your pictures page when clicking account button and basket is not empty", () => {
    const accountButtonTestId = "appbar-basket-button"

    const picture: PictureItem = {
      momentId: "momentId",
      label: "label",
      url: "url",
      price: 123,
      addedToBasket: false
    }

    const pictures: PictureItem[] = [{ ...picture, addedToBasket: true }, { ...picture }]

    const { getByTestId } = render(<MainAppToolbarComponent pictures={pictures} />)

    fireEvent.click(getByTestId(accountButtonTestId))

    expect(Router.push).toHaveLength(1)
    expect(Router[0]).toEqual("/select-your-pictures")
  })
})
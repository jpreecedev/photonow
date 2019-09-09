import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { PictureItem } from "../../global"
import { rootReducer as reducer } from "../../store"
import { PlainMainAppBar } from "."

describe("<MainAppBar /> tests", () => {
  it("should render a default app bar", () => {
    const appbarTestId = "appbar-container"
    const pictures: PictureItem[] = []

    const { getByTestId } = render(<PlainMainAppBar pictures={pictures} />)

    expect(getByTestId(appbarTestId)).toMatchSnapshot()
  })
})

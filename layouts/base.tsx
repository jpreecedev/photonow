import React, { FunctionComponent } from "react"

import { MainAppBar } from "../components/MainAppBar"

interface BaseProps {
  gap?: boolean
}

const Base: FunctionComponent<BaseProps> = ({ gap = false, children }) => {
  return (
    <>
      <MainAppBar gap={gap} />
      {children}
    </>
  )
}

export { Base }

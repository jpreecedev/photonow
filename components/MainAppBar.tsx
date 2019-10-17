import React, { FunctionComponent } from "react"
import clsx from "clsx"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"

import { MainAppToolbar } from "./MainAppToolbar"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    gap: {
      marginBottom: theme.spacing(4)
    },
    title: {
      display: "block",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    section: {
      display: "flex"
    }
  })
)

interface MainAppBarProps {
  gap?: boolean
}

const MainAppBar: FunctionComponent<MainAppBarProps> = ({ gap = false }) => {
  const classes = useStyles({})

  const rootClasses = clsx(classes.grow, {
    [classes.gap]: gap
  })

  return (
    <div data-testid="appbar-container" className={rootClasses}>
      <AppBar position="static">
        <MainAppToolbar />
      </AppBar>
    </div>
  )
}

export { MainAppBar }

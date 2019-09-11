import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import Link from "next/link"
import clsx from "clsx"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ShoppingBasket from "@material-ui/icons/ShoppingBasket"

import { AppState, PictureItem } from "../../global"

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
  pictures?: PictureItem[]
  gap?: boolean
}

export const MainAppBarComponent: FunctionComponent<MainAppBarProps> = ({
  gap = false,
  pictures = []
}) => {
  const classes = useStyles({})
  let addedToBasket = 0

  if (pictures && pictures.length) {
    addedToBasket = pictures.reduce((acc, current) => (current.addedToBasket ? (acc += 1) : acc), 0)
  }

  const rootClasses = clsx(classes.grow, {
    [classes.gap]: gap
  })

  return (
    <div data-testid="appbar-container" className={rootClasses}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography className={classes.title} variant="h6" component="a" noWrap>
              Find My Face
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.section}>
            <IconButton
              data-testid="appbar-basket-button"
              aria-label="Basket"
              color="inherit"
              onClick={() => {
                Router.push("/checkout")
              }}
            >
              <Badge
                data-testid="appbar-basket-badge"
                badgeContent={addedToBasket}
                color="secondary"
              >
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <IconButton
              data-testid="appbar-account-button"
              edge="end"
              aria-label="account of current user"
              onClick={() => {
                Router.push("/login")
              }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const ConnectedMainAppBar = connect((state: AppState) => ({ pictures: state.pictures }))(
  MainAppBarComponent
)

export { ConnectedMainAppBar as MainAppBar }

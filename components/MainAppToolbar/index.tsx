import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import Link from "next/link"
import clsx from "clsx"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ShoppingBasket from "@material-ui/icons/ShoppingBasket"
import MenuIcon from "@material-ui/icons/Menu"
import ExitToApp from "@material-ui/icons/ExitToApp"

import { AppState, PictureItem } from "../../global"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
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
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
)

interface MainAppToolbarProps {
  pictures?: PictureItem[]
  title?: string
}

export const MainAppToolbarComponent: FunctionComponent<MainAppToolbarProps> = ({
  pictures,
  title = "PhotoNow"
}) => {
  const classes = useStyles({})

  let addedToBasket = 0
  if (pictures && pictures.length) {
    addedToBasket = pictures.reduce((acc, current) => (current.addedToBasket ? (acc += 1) : acc), 0)
  }

  return (
    <Toolbar>
      <Link href="/">
        <Typography className={classes.title} variant="h6" component="a" noWrap>
          {title}
        </Typography>
      </Link>
      <div className={classes.grow} />
      <div className={classes.section}>
        <IconButton
          data-testid="appbar-basket-button"
          aria-label="Basket"
          color="inherit"
          onClick={() => {
            if (addedToBasket === 0) {
              Router.push("/getting-started")
              return
            }
            Router.push("/select-your-pictures")
          }}
        >
          <Badge data-testid="appbar-basket-badge" badgeContent={addedToBasket} color="secondary">
            <ShoppingBasket />
          </Badge>
        </IconButton>
        <IconButton
          data-testid="appbar-account-button"
          aria-label="account of current user"
          onClick={() => {
            Router.push("/login")
          }}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          data-testid="appbar-account-button"
          edge="end"
          aria-label="logout"
          onClick={() => {
            Router.push("/api/auth/logout")
          }}
          color="inherit"
        >
          <ExitToApp />
        </IconButton>
      </div>
    </Toolbar>
  )
}

const ConnectedMainAppToolbar = connect((state: AppState) => ({ pictures: state.pictures }))(
  MainAppToolbarComponent
)

export { ConnectedMainAppToolbar as MainAppToolbar }

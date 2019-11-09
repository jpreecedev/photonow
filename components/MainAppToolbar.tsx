import React, { FunctionComponent } from "react"
import { connect, DispatchProp } from "react-redux"
import Router from "next/router"
import Link from "next/link"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Typography, Badge, Hidden } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ShoppingBasket from "@material-ui/icons/ShoppingBasket"
import ExitToApp from "@material-ui/icons/ExitToApp"
import Camera from "@material-ui/icons/Camera"
import MenuIcon from "@material-ui/icons/Menu"

import { AppState, PictureItem } from "../global"
import { actions } from "../store"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    grow: {
      flexGrow: 1
    },
    title: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        textDecoration: "underline"
      }
    },
    toolbar: theme.mixins.toolbar,
    section: {
      display: "flex"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    icon: {
      marginRight: theme.spacing(1)
    }
  })
)

interface MainAppToolbarProps {
  pictures?: PictureItem[]
  fixed: boolean
  handleDrawerToggle: Function
  showDrawerToggle: boolean
}

export const MainAppToolbarComponent: FunctionComponent<
  MainAppToolbarProps & DispatchProp<any>
> = ({ pictures, fixed = false, handleDrawerToggle, showDrawerToggle = false, dispatch }) => {
  const classes = useStyles({})

  let addedToBasket = 0
  if (pictures && pictures.length) {
    addedToBasket = pictures.reduce((acc, current) => (current.addedToBasket ? (acc += 1) : acc), 0)
  }

  return (
    <AppBar position={fixed ? "fixed" : "static"} className={classes.appBar}>
      <Toolbar>
        {showDrawerToggle && (
          <Hidden smUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => handleDrawerToggle()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}
        <Link href="/">
          <Typography className={classes.title} variant="h6" component="a">
            <Camera className={classes.icon} />
            PhotoNow
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
                Router.push("/select-gallery")
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
              dispatch(actions.pictures.clearBasket())
              Router.push("/api/auth/logout")
            }}
            color="inherit"
          >
            <ExitToApp />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const ConnectedMainAppToolbar = connect((state: AppState) => ({ pictures: state.pictures }))(
  MainAppToolbarComponent
)

export { ConnectedMainAppToolbar as MainAppToolbar }

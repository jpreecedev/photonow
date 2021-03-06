import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import Router from "next/router"
import Link from "next/link"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Typography, Badge, Hidden } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ExitToApp from "@material-ui/icons/ExitToApp"
import Camera from "@material-ui/icons/Camera"
import MenuIcon from "@material-ui/icons/Menu"

import { AppState } from "../../global"
import { store } from "../../store"
import { clear } from "../../store/basket"

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
  fixed: boolean
  handleDrawerToggle: Function
  showDrawerToggle: boolean
}

export const MainAppToolbarComponent: FunctionComponent<MainAppToolbarProps> = ({
  fixed = false,
  handleDrawerToggle,
  showDrawerToggle = false
}) => {
  const classes = useStyles({})

  let addedToBasket = 0
  const pictures = useSelector((state: AppState) => state.pictures)
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
              store.dispatch(clear())
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

export { MainAppToolbarComponent as MainAppToolbar }

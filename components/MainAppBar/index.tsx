import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import Router from "next/router"
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
      display: "block"
    },
    section: {
      display: "flex"
    }
  })
)

interface MainAppBarProps {
  gap?: boolean
  pictures: PictureItem[]
}

const MainAppBar: FunctionComponent<MainAppBarProps> = ({ gap = false, pictures }) => {
  const classes = useStyles({})

  const addedToBasket = pictures.reduce(
    (acc, current) => (current.addedToBasket ? (acc += 1) : acc),
    0
  )

  const rootClasses = clsx(classes.grow, {
    [classes.gap]: gap
  })

  return (
    <div className={rootClasses}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Find My Face
          </Typography>
          <div className={classes.grow} />
          <div className={classes.section}>
            <IconButton
              aria-label="Basket"
              color="inherit"
              onClick={() => {
                Router.push("/checkout")
              }}
            >
              <Badge badgeContent={addedToBasket} color="secondary">
                <ShoppingBasket />
              </Badge>
            </IconButton>
            <IconButton
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

const ConnectedMainAppBar = connect((state: AppState) => ({ pictures: state.pictures }))(MainAppBar)

export { ConnectedMainAppBar as MainAppBar }

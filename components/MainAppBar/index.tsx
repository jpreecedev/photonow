import React, { FunctionComponent } from "react"
import Link from "next/link"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import FaceIcon from "@material-ui/icons/Face"
import clsx from "clsx"

interface MainAppBarProps {
  gap?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    gap: {
      marginBottom: theme.spacing(4)
    },
    title: {
      flexGrow: 1
    }
  })
)

const MainAppBar: FunctionComponent<MainAppBarProps> = ({ gap = false }) => {
  const classes = useStyles({})

  const rootClasses = clsx(classes.root, {
    [classes.gap]: gap
  })

  return (
    <div className={rootClasses}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FaceIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Find My Face
          </Typography>
          <Button color="inherit">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export { MainAppBar }

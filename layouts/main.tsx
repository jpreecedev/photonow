import React, { FunctionComponent } from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Box from "@material-ui/core/Box"
import Hidden from "@material-ui/core/Hidden"
import HomeIcon from "@material-ui/icons/Home"
import FacesIcon from "@material-ui/icons/TagFaces"
import { MainAppToolbar } from "../components/MainAppToolbar"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    fullWidth: {
      width: "100%"
    },
    icon: {
      minWidth: theme.spacing(4)
    }
  })
)

interface MainLayoutProps {
  title?: string
  showNavigation?: boolean
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
  title,
  showNavigation = false
}) => {
  const classes = useStyles({})
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = (event = null) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <List>
      <ListItem button>
        <ListItemIcon className={classes.icon}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.icon}>
          <FacesIcon />
        </ListItemIcon>
        <ListItemText primary="Collections" />
      </ListItem>
    </List>
  )

  const fixedDrawer = (
    <Hidden smDown implementation="css">
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        {drawerContent}
      </Drawer>
    </Hidden>
  )

  const responsiveDrawer = (
    <Hidden smDown implementation="css">
      <div
        role="presentation"
        onClick={e => handleDrawerToggle(e)}
        onKeyDown={e => handleDrawerToggle(e)}
      >
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="bottom"
          open={mobileOpen}
          classes={{
            paper: `${classes.drawerPaper} ${classes.fullWidth}`
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawerContent}
        </Drawer>
      </div>
    </Hidden>
  )

  const drawer = (
    <>
      {fixedDrawer}
      {responsiveDrawer}
    </>
  )

  return (
    <Box display={showNavigation ? "flex" : "block"}>
      <MainAppToolbar
        title={title}
        fixed={showNavigation}
        handleDrawerToggle={() => handleDrawerToggle()}
        showDrawerToggle={showNavigation}
      />
      {showNavigation && (
        <nav className={classes.drawer} aria-label="Navigation">
          {drawer}
        </nav>
      )}
      {children}
    </Box>
  )
}

export { MainLayout }

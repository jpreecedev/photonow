import React, { FunctionComponent } from "react"
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles"
import {
  Drawer,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Hidden
} from "@material-ui/core"
import DashboardIcon from "@material-ui/icons/Dashboard"
import FacesIcon from "@material-ui/icons/TagFaces"
import SupervisorIcon from "@material-ui/icons/SupervisorAccount"
import { MainAppToolbar } from "../components/MainAppToolbar"
import { ROLES } from "../utils/roles"
import { getUserFromJwt } from "../utils/cookies"

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),

      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(3)
      }
    },
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
  showNavigation?: boolean
  title?: string
  subtitle?: string
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  children,
  showNavigation = false,
  title = null,
  subtitle = null,
  maxWidth = "md"
}) => {
  const classes = useStyles({})
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const user = getUserFromJwt()

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
      <ListItem button component="a" href="/dashboard">
        <ListItemIcon className={classes.icon}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component="a" href="/dashboard/collections">
        <ListItemIcon className={classes.icon}>
          <FacesIcon />
        </ListItemIcon>
        <ListItemText primary="Collections" />
      </ListItem>
      {user && user.role === ROLES.Admin && (
        <ListItem button component="a" href="/dashboard/users">
          <ListItemIcon className={classes.icon}>
            <SupervisorIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      )}
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
        fixed={showNavigation}
        handleDrawerToggle={() => handleDrawerToggle()}
        showDrawerToggle={showNavigation}
      />
      {showNavigation && (
        <nav className={classes.drawer} aria-label="Navigation">
          {drawer}
        </nav>
      )}
      <Container maxWidth={maxWidth}>
        <Box mt={5} mb={5} flexGrow={1}>
          {showNavigation && <div className={classes.toolbar} />}
          {title && (
            <Typography variant="h4" component="h1" gutterBottom>
              {title}
            </Typography>
          )}
          {title && subtitle && (
            <Typography component="p" gutterBottom>
              {subtitle}
            </Typography>
          )}
          <main>{children}</main>
        </Box>
      </Container>
    </Box>
  )
}

export { MainLayout }

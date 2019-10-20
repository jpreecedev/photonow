import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import { MainAppToolbar } from "../components/MainAppToolbar"
import { RolesFormContainer } from "../components/RolesFormContainer"
import { FaceCollectionsContainer } from "../components/FaceCollectionsContainer"
import { ROLES } from "../utils/roles"
import { getAsync } from "../utils/server"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing(1)
  }
}))

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  const classes = useStyles({})
  const [role, setRole] = React.useState<string>(ROLES.Customer)

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await getAsync<string>("/users/role")
      if (success) {
        setRole(data)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <MainAppToolbar title="Dashboard" />
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <FaceCollectionsContainer />
              </Paper>
            </Grid>
            {role === ROLES.Admin && (
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <RolesFormContainer />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard

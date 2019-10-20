import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

import { RolesFormContainer } from "../components/RolesFormContainer"
import { FaceCollectionsContainer } from "../components/FaceCollectionsContainer"
import { ROLES } from "../utils/roles"
import { getAsync } from "../utils/server"

import { MainLayout } from "../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),

    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(3)
    }
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
  },
  toolbar: theme.mixins.toolbar
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
    <MainLayout showNavigation={true} title="Dashboard">
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.container}>
          <Grid container>
            <Grid item xs={12}>
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
    </MainLayout>
  )
}

export default Dashboard

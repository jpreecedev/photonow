import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import { MainAppToolbar } from "../components/MainAppToolbar"
import { RolesFormContainer } from "../components/RolesFormContainer"

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
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Face Recognition Photo Collections
                </Typography>
                <div>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Create new collection
                  </Button>
                  <Button variant="contained" className={classes.button}>
                    Secondary
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <RolesFormContainer />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard

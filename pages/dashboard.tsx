import React from "react"
import { NextPage } from "next"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import { DatabaseUser } from "../global"
import { MainAppToolbar } from "../components/MainAppToolbar"
import { Select } from "../components/Select"
import { getAsync } from "../utils/server"
import { Roles } from "../components/Roles"

const useStyles = makeStyles(theme => ({
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
  const [users, setUsers] = React.useState<DatabaseUser[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await getAsync<DatabaseUser[]>("/users")
      if (success) {
        setUsers(data)
      } else {
        setUsers([])
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
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Face Recognition Photo Collections
                </Typography>
                <Select id="collections" label="Collections" value="" onChange={() => {}}>
                  <option value={20}>Twenty</option>
                </Select>
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
              <Roles users={users} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard

import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import { Paper } from "@material-ui/core"

import { RolesFormContainer } from "../../components/RolesFormContainer"
import { ROLES } from "../../utils/roles"
import { getAsync } from "../../utils/server"

import { MainLayout } from "../../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
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

interface CollectionsProps {}

const Collections: NextPage<CollectionsProps> = () => {
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
    <MainLayout showNavigation={true} title="Users" maxWidth={false}>
      {role === ROLES.Admin && (
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <RolesFormContainer />
          </Paper>
        </Grid>
      )}
    </MainLayout>
  )
}

export default Collections

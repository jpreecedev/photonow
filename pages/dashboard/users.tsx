import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Paper } from "@material-ui/core"

import { RolesFormContainer } from "../../components/RolesFormContainer"

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

  return (
    <MainLayout showNavigation={true} title="Users" maxWidth={false}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <RolesFormContainer />
        </Paper>
      </Grid>
    </MainLayout>
  )
}

export default Collections

import React from "react"
import { NextPage } from "next"
import { Box, Paper, Typography, Button } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import PeopleIcon from "@material-ui/icons/EmojiPeople"
import CameraIcon from "@material-ui/icons/Camera"
import Router from "next/router"

import { MainLayout } from "../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  },
  error: {
    color: theme.palette.error.main,
    textAlign: "center"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

interface PhotographersProps {}

const Photographers: NextPage<PhotographersProps> = () => {
  const classes = useStyles({})

  return (
    <MainLayout maxWidth="md">
      <Paper className={classes.paper} elevation={2}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Typography component="h1" variant="h4" gutterBottom>
            Choose your account type
          </Typography>
          <Typography component="p" gutterBottom align="center">
            Are you looking to purchase your precious moments, <br />
            or are you a photographer looking to use our marketplace service?
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PeopleIcon />}
              onClick={() => {
                Router.push("/login?type=customer")
              }}
            >
              I am looking for my pictures
            </Button>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CameraIcon />}
              onClick={() => {
                Router.push("/login?type=photographer")
              }}
            >
              I have pictures to sell
            </Button>
          </Box>
        </Box>
      </Paper>
    </MainLayout>
  )
}

export default Photographers

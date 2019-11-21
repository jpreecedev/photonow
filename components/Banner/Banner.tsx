import React, { FunctionComponent } from "react"
import { Box, Paper, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "clsx"

interface BannerProps {
  message: React.ReactElement
  icon: React.ReactElement
  theme?: "error" | "info"
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2)
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText
  },
  info: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  icon: {
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2)
  }
}))

const Banner: FunctionComponent<BannerProps> = ({ message, icon, theme = "error" }) => {
  const classes = useStyles({})

  const themeClasses = clsx(classes.paper, {
    [classes.error]: theme === "error",
    [classes.info]: theme === "info"
  })

  return (
    <Paper elevation={1} className={themeClasses}>
      <Grid container wrap="nowrap">
        <Grid item>
          <Box className={classes.icon}>{icon}</Box>
        </Grid>
        <Grid item>{message}</Grid>
      </Grid>
    </Paper>
  )
}

export { Banner }

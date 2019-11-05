import React, { FunctionComponent } from "react"
import { Typography, Box, Paper, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "clsx"

interface BannerProps {
  message: string
  icon: React.ReactElement
  theme?: "error"
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
  icon: {
    marginRight: theme.spacing(2.5),
    marginBottom: theme.spacing(2)
  }
}))

const Banner: FunctionComponent<BannerProps> = ({ message, icon, theme }) => {
  const classes = useStyles({})

  const themeClasses = clsx(classes.paper, {
    [classes.error]: theme === "error"
  })

  return (
    <Paper elevation={1} className={themeClasses}>
      <Grid container wrap="nowrap">
        <Grid item>
          <Box className={classes.icon}>{icon}</Box>
        </Grid>
        <Grid item>
          <Typography>{message}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { Banner }

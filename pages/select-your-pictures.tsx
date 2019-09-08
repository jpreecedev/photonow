import React from "react"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

import { AppState } from "../store/types"
import { Main } from "../layouts/main"

const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${theme.spacing(8)}px ${theme.spacing(6)}px`
    }
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

function SelectYourPictures({ pictures }) {
  const classes = useStyles({})

  return (
    <Main gap>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography component="h1" variant="h4" align="center">
            Choose your pictures
          </Typography>
          <Typography component="p" gutterBottom>
            Please review your pictures and add any you would like to purchase to your
            basket
          </Typography>
          <Grid container spacing={4}>
            {pictures &&
              pictures.map(picture => (
                <Grid item key={picture.url} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={picture.url}
                      title={picture.label}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography>
                        Your picture is available for purchase for only &pound;
                        {Number.parseInt(process.env.DEFAULT_MOMENT_PRICE) / 100}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Add to basket
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </main>
    </Main>
  )
}

export default connect((state: AppState) => ({ pictures: state.pictures }))(
  SelectYourPictures
)

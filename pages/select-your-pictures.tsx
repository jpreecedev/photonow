import React from "react"
import { connect, DispatchProp } from "react-redux"
import { NextPage } from "next"
import Link from "next/link"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"

import { AppState, PictureItem } from "../global"
import { MainLayout } from "../layouts/main"
import { actions } from "../store"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
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

interface SelectYourPicturesProps {
  pictures: PictureItem[]
}

const SelectYourPictures: NextPage<DispatchProp<any> & SelectYourPicturesProps> = ({
  pictures,
  dispatch
}) => {
  const classes = useStyles({})

  const addedToBasket = pictures.reduce(
    (acc, current) => (current.addedToBasket ? (acc += 1) : acc),
    0
  )

  const renderNoPicturesFound = () => (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" mb={3}>
        <Typography component="h1" variant="h4" align="center">
          Nothing to show
        </Typography>
        <Typography component="p" gutterBottom>
          Sorry, we were not able to find any pictures of you, please try again.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Link href="/select-gallery">
          <Button size="large" color="primary" variant="contained">
            Try again
          </Button>
        </Link>
      </Box>
    </>
  )

  const renderPictures = () => {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mb={3}
        >
          <Typography component="h1" variant="h4" align="center">
            Choose your pictures
          </Typography>
          <Typography component="p" gutterBottom>
            Please review your pictures and add any you would like to purchase to your basket
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {pictures.map((picture: PictureItem) => (
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
                  {!picture.addedToBasket && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => dispatch(actions.pictures.addToBasket(picture))}
                    >
                      Add to basket
                    </Button>
                  )}
                  {picture.addedToBasket && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => dispatch(actions.pictures.removeFromBasket(picture))}
                    >
                      Remove from basket
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Link href="/checkout">
            <Button size="large" color="primary" variant="contained" disabled={!addedToBasket}>
              Proceed to checkout
            </Button>
          </Link>
        </Box>
      </>
    )
  }

  return (
    <MainLayout>
      <main className={classes.content}>
        <Container maxWidth="md">
          <Paper className={classes.paper} elevation={2}>
            {pictures && pictures.length > 0 ? renderPictures() : renderNoPicturesFound()}
          </Paper>
        </Container>
      </main>
    </MainLayout>
  )
}

export default connect((state: AppState) => ({ pictures: state.pictures }))(SelectYourPictures)

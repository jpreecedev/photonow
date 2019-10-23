import React from "react"
import { NextPage } from "next"
import { Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Router from "next/router"

import * as server from "../utils/server"
import { MainLayout } from "../layouts/main"
import { CollectionWithCoverPhoto } from "../global"
import { ImageStack } from "../components/ImageStack"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

interface SelectGalleryProps {}

const SelectGallery: NextPage<SelectGalleryProps> = () => {
  const classes = useStyles({})
  const [collections, setCollections] = React.useState<CollectionWithCoverPhoto[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await server.getAsync<CollectionWithCoverPhoto[]>(
        "/collections?populate=true"
      )
      if (success) {
        setCollections(data)
      }
    }
    fetchData()
  }, [])

  const handleSelect = (id: string) => {
    Router.push(`/getting-started/${id}`)
  }

  return (
    <MainLayout>
      <main className={classes.content}>
        <Container>
          <Typography component="h1" variant="h4" gutterBottom>
            Select a gallery
          </Typography>
          <Typography component="p" gutterBottom>
            Choose an image gallery from which to search for pictures of yourself
          </Typography>
          <Grid container spacing={3}>
            {collections.map((collection: CollectionWithCoverPhoto) => (
              <Grid item xs={12} md={4} key={collection._id}>
                <ImageStack
                  imgSrc={
                    collection.coverPhoto ? collection.coverPhoto.resizedLocation : "/cover.png"
                  }
                  caption={collection.name}
                  onClick={() => handleSelect(collection._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </MainLayout>
  )
}

export default SelectGallery

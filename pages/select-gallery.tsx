import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import Router from "next/router"

import * as server from "../utils/server"
import { MainLayout } from "../layouts/main"
import { CollectionWithCoverPhoto } from "../global"
import { ImageStack } from "../components/ImageStack"

interface SelectGalleryProps {}

const SelectGallery: NextPage<SelectGalleryProps> = () => {
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
    <MainLayout
      title="Select a gallery"
      subtitle="Choose an image gallery from which to search for pictures of yourself"
    >
      <Grid container spacing={3}>
        {collections.map((collection: CollectionWithCoverPhoto) => (
          <Grid item xs={12} md={4} key={collection._id}>
            <ImageStack
              imgSrc={collection.coverPhoto ? collection.coverPhoto.resizedLocation : "/cover.png"}
              caption={collection.name}
              onClick={() => handleSelect(collection._id)}
            />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  )
}

export default SelectGallery

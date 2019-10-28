import React from "react"
import { NextPage } from "next"
import { Grid } from "@material-ui/core"

import { FaceCollectionsContainer } from "../../components/FaceCollectionsContainer"
import { MainLayout } from "../../layouts/main"

interface CollectionsProps {}

const Collections: NextPage<CollectionsProps> = () => {
  return (
    <MainLayout showNavigation={true} title="Collections" maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <FaceCollectionsContainer />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Collections

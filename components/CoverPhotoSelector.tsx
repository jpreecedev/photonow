import React, { FunctionComponent } from "react"
import { Types } from "mongoose"
import { Typography, Grid } from "@material-ui/core"

import { ImageStack } from "../components/ImageStack"
import { Moment } from "../global"
import * as server from "../utils/server"

interface CoverPhotoSelectorProps {
  selectedCollectionId: string
  coverPhoto: Types.ObjectId
}

const CoverPhotoSelector: FunctionComponent<CoverPhotoSelectorProps> = ({
  selectedCollectionId,
  coverPhoto
}) => {
  const [moments, setMoments] = React.useState<Moment[]>([])
  const [selectedCoverPhoto, setSelectedCoverPhoto] = React.useState<Moment>(null)

  const handleSetCover = async (selectedMoment: Moment) => {
    try {
      const { success } = await server.putAsync<boolean>("/collections/cover", {
        collectionId: selectedCollectionId,
        coverPhoto: selectedMoment
      })

      if (success) {
        setSelectedCoverPhoto(selectedMoment)
      }
    } catch (error) {
      // TODO
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await server.getAsync<Moment[]>(`/moments/${selectedCollectionId}`)
      if (success) {
        setMoments(data)
        setSelectedCoverPhoto(data.find(photo => photo._id === coverPhoto))
      } else {
        setMoments([])
      }
    }

    fetchData()
  }, [selectedCollectionId])

  if (!moments || !moments.length) {
    return (
      <Typography component="p" gutterBottom>
        There is a whole lot of nothing here
      </Typography>
    )
  }

  return (
    <Grid container spacing={3}>
      {moments.map(moment => (
        <Grid item xs={12} md={3} key={moment._id}>
          <ImageStack
            imgSrc={moment.resizedLocation}
            size={225}
            onClick={() => handleSetCover(moment)}
            selected={selectedCoverPhoto && moment._id === selectedCoverPhoto._id}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export { CoverPhotoSelector }

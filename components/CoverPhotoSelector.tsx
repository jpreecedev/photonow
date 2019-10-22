import React, { FunctionComponent } from "react"
import { Typography } from "@material-ui/core"

import { ImageGallery } from "../components/ImageGallery"
import { Moment } from "../global"
import { getAsync } from "../utils/server"

interface CoverPhotoSelectorProps {
  selectedCollectionId: string
}

const CoverPhotoSelector: FunctionComponent<CoverPhotoSelectorProps> = ({
  selectedCollectionId
}) => {
  const [moments, setMoments] = React.useState<Moment[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await getAsync<Moment[]>(`/moments/${selectedCollectionId}`)
      if (success) {
        setMoments(data)
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
    <ImageGallery
      images={moments.map(moment => ({
        key: moment._id,
        name: moment.filename,
        imgSrc: moment.resizedLocation
      }))}
    />
  )
}

export { CoverPhotoSelector }

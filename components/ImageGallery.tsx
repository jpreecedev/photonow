import React, { FunctionComponent } from "react"
import Grid from "@material-ui/core/Grid"

import { ImageStack } from "../components/ImageStack"

interface ImageGalleryProps {
  images: { key: string; name: string; imgSrc: string }[]
  size?: 250 | 150
}

const ImageGallery: FunctionComponent<ImageGalleryProps> = ({ images, size = 150 }) => {
  return (
    <>
      {images.map(image => (
        <Grid item xs={12} md={3} key={image.key}>
          <ImageStack imgSrc={image.imgSrc} caption={image.name} size={size} />
        </Grid>
      ))}
    </>
  )
}

export { ImageGallery }

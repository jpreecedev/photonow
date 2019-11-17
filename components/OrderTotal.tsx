import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

import { AppState } from "../global"

const useStyles = makeStyles((theme: Theme) => ({
  total: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const OrderTotal: FunctionComponent = () => {
  const classes = useStyles({})
  const pictures = useSelector((state: AppState) => state.pictures)
  const picturesInBasket = pictures.filter(picture => picture.addedToBasket)

  return (
    <Typography variant="subtitle1" className={classes.total} align="right">
      Order Total: &pound;
      {(picturesInBasket.reduce((acc, current) => (acc += current.price), 0) / 100).toFixed(2)}
    </Typography>
  )
}

export { OrderTotal }

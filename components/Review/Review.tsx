import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { makeStyles, Theme } from "@material-ui/core/styles"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

import { AppState } from "../../global"
import { store } from "../../store"
import { remove } from "../../store/basket"

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
}))

const Review: FunctionComponent = () => {
  const classes = useStyles({})
  const pictures = useSelector((state: AppState) => state.pictures)
  const picturesInBasket = pictures.filter(picture => picture.addedToBasket)

  return (
    <>
      <Typography component="h2" variant="h5">
        Your order
      </Typography>
      <List disablePadding>
        {picturesInBasket.map(picture => (
          <ListItem className={classes.listItem} key={picture.label}>
            <ListItemAvatar>
              <Avatar alt={picture.label} src={picture.url} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={picture.label}
              secondary={`£${(picture.price / 100).toFixed(2)}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => store.dispatch(remove(picture))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export { Review }

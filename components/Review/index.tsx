import React, { FunctionComponent } from "react"
import { connect, DispatchProp } from "react-redux"
import { makeStyles,Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

import { AppState, PictureItem } from "../../global"
import { actions } from "../../store"

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    marginTop: theme.spacing(2)
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
}))

interface ReviewProps {
  pictures: PictureItem[]
}

const Review: FunctionComponent<DispatchProp<any> & ReviewProps> = ({ pictures, dispatch }) => {
  const classes = useStyles({})
  const picturesInBasket = pictures.filter(picture => picture.addedToBasket)

  return (
    <>
      <Typography component="h2" variant="h5" gutterBottom>
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
                onClick={() => dispatch(actions.pictures.removeFromBasket(picture))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Divider component="li" />
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            &pound;
            {(picturesInBasket.reduce((acc, current) => (acc += current.price), 0) / 100).toFixed(
              2
            )}
          </Typography>
        </ListItem>
        <Divider component="li" />
      </List>
    </>
  )
}

const ConnectedReview = connect((state: AppState) => ({ pictures: state.pictures }))(Review)

export { ConnectedReview as Review }

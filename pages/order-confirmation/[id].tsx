import React, { FunctionComponent } from "react"
import { useRouter } from "next/router"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import CloudDownload from "@material-ui/icons/CloudDownload"

import * as server from "../../utils/server"
import { Order, Moment } from "../../global"
import { Main } from "../../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  listItem: {
    padding: theme.spacing(1, 0)
  }
}))

interface OrderConfirmationProps {}

const OrderConfirmation: FunctionComponent<OrderConfirmationProps> = () => {
  const classes = useStyles({})
  const router = useRouter()
  const [state, setState] = React.useState<{ moments: Moment[] }>({ moments: [] })

  React.useEffect(() => {
    const fetchData = async () => {
      if (!router.query.id) {
        return
      }

      const { success, data } = await server.getAsync<Order>(`/order/${router.query.id}`)
      if (success) {
        setState(data)
      }
    }
    fetchData()
  }, [router.query])

  return (
    <Main gap>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" gutterBottom>
            Your Order
          </Typography>
          <Typography component="p" gutterBottom>
            Use the download buttons to download your high quality pictures
          </Typography>
          <List disablePadding>
            {state.moments &&
              state.moments.map(moment => (
                <ListItem className={classes.listItem} key={moment.filename}>
                  <ListItemAvatar>
                    <Avatar
                      alt={moment.filename}
                      src={moment.resizedLocation}
                      className={classes.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={moment.filename}
                    secondary="High quality version ready to download."
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Download" href={moment.location}>
                      <CloudDownload />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Paper>
      </main>
    </Main>
  )
}

export default OrderConfirmation

import React from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { List } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { ListItemAvatar } from "@material-ui/core"
import { ListItemText } from "@material-ui/core"
import { ListItemSecondaryAction } from "@material-ui/core"
import { Avatar } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import CloudDownload from "@material-ui/icons/CloudDownload"

import * as server from "../../utils/server"
import { Order, Moment } from "../../global"
import { MainLayout } from "../../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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

const OrderConfirmation: NextPage<OrderConfirmationProps> = () => {
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
    <MainLayout
      title="Your Order"
      subtitle="Use the download buttons to download your high quality pictures"
    >
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
    </MainLayout>
  )
}

export default OrderConfirmation

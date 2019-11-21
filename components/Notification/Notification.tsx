import React, { FunctionComponent } from "react"
import { Snackbar } from "@material-ui/core"

interface NotificationProps {
  vertical?: "bottom" | "top"
  horizontal?: "left" | "center" | "right"
  message: string
  open: boolean
  onClose: Function
}

const Notification: FunctionComponent<NotificationProps> = ({
  open,
  message,
  onClose,
  vertical = "bottom",
  horizontal = "left"
}) => {
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    onClose()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical,
        horizontal
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{message}</span>}
    />
  )
}

export { Notification }

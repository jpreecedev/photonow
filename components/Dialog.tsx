import React, { FunctionComponent } from "react"
import { Button } from "@material-ui/core"
import { Dialog as MaterialDialog } from "@material-ui/core"
import { DialogActions } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { DialogContentText } from "@material-ui/core"
import { DialogTitle } from "@material-ui/core"

interface DialogProps {
  isOpen: boolean
  title: string
  text: string
  submitText: string
  onClose: (confirm: boolean) => void
}

const Dialog: FunctionComponent<DialogProps> = ({
  isOpen,
  title,
  text,
  submitText,
  onClose,
  children
}) => {
  const [open, setOpen] = React.useState(isOpen)

  React.useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = (confirm: boolean) => {
    setOpen(false)
    onClose(confirm)
  }

  return (
    <MaterialDialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleClose(true)} color="primary">
          {submitText}
        </Button>
      </DialogActions>
    </MaterialDialog>
  )
}
export { Dialog }

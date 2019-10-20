import React, { FunctionComponent } from "react"
import Button from "@material-ui/core/Button"
import MaterialDialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

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

  const handleClose = confirm => {
    setOpen(false)
    onClose(confirm)
  }

  return (
    <MaterialDialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
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

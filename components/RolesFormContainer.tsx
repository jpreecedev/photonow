import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography, Button, CircularProgress } from "@material-ui/core"

import { DatabaseUser, AppState } from "../global"
import { getAsync, postAsync } from "../utils/server"
import { RolesForm } from "./RolesForm"
import { Notification } from "../components/Notification"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  select: {
    color: theme.palette.text.secondary
  }
}))

const RolesFormContainer: FunctionComponent = () => {
  const classes = useStyles({})
  const rolesForm = useSelector((state: AppState) => state.form.rolesForm)

  const [users, setUsers] = React.useState<DatabaseUser[]>([])
  const [processing, setProcessing] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [notificationMessage, setNotificationMessage] = React.useState("")

  React.useEffect(() => {
    const fetchData = async () => {
      const { success, data } = await getAsync<DatabaseUser[]>("/users")
      if (success) {
        setUsers(data)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    setProcessing(true)

    try {
      const formData = {
        id: rolesForm.values.user,
        role: rolesForm.values.role
      }

      const { success, data } = await postAsync<string>("/users/role", formData)
      if (success) {
        setNotificationMessage("Role updated")
      } else {
        setNotificationMessage(`There was an error: ${data}`)
      }
      setOpen(true)
    } catch (error) {
      setNotificationMessage(`There was an error: ${error}`)
      setOpen(true)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Roles
      </Typography>
      <Notification open={open} message={notificationMessage} onClose={() => setOpen(false)} />
      <RolesForm users={users} />
      <div className={classes.buttons}>
        <Button
          disabled={processing}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
        >
          {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
          Change role
        </Button>
      </div>
    </>
  )
}

export { RolesFormContainer }

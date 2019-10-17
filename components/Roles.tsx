import React, { FunctionComponent } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import { DatabaseUser } from "../global"
import { Select } from "../components/Select"
import { ROLES } from "../utils/roles"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing(1)
  }
}))

interface RolesProps {
  users: DatabaseUser[]
}

const DEFAULT_USER = {
  _id: "",
  name: "",
  role: ""
} as DatabaseUser

const Roles: FunctionComponent<RolesProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = React.useState<DatabaseUser>(DEFAULT_USER)
  const [selectedRole, setSelectedRole] = React.useState<string>("")

  React.useEffect(() => {
    if (users && users.length) {
      setSelectedUser(users[0])
      setSelectedRole(users[0].role)
    } else {
      setSelectedUser(DEFAULT_USER)
      setSelectedRole(DEFAULT_USER.role)
    }
  }, [users])

  const classes = useStyles({})
  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Roles
      </Typography>
      <Select
        id="user"
        label="Select a user"
        value={selectedUser._id}
        helperText={selectedUser && `Current role: ${selectedUser.role}`}
        onChange={event => {
          const user = users.find(user => user._id === event.target.value)
          setSelectedUser(user)
          setSelectedRole(user.role)
        }}
      >
        {users.map((user: DatabaseUser) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </Select>
      <Select
        id="role"
        label="Select a role"
        value={selectedRole}
        onChange={event => setSelectedRole(ROLES[event.target.value])}
      >
        {Object.keys(ROLES).map((role: string) => (
          <option key={ROLES[role]} value={ROLES[role]}>
            {ROLES[role]}
          </option>
        ))}
      </Select>
      <Grid container spacing={1} direction="column" alignItems="center">
        <Button variant="contained" color="primary" className={classes.button}>
          Update role
        </Button>
      </Grid>
    </Paper>
  )
}

export { Roles }

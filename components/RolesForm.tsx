import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Box, FormControl, InputLabel } from "@material-ui/core"

import { DatabaseUser } from "../global"
import { ROLES } from "../utils/roles"
import { renderSelectField } from "./ReduxForm"

interface RolesFormProps {}

interface RolesDispatchProps {
  users: DatabaseUser[]
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    color: theme.palette.text.secondary
  }
}))

const RolesForm: FunctionComponent<
  RolesDispatchProps & InjectedFormProps<RolesFormProps, RolesDispatchProps>
> = ({ handleSubmit, users }) => {
  const classes = useStyles({})

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="user" shrink>
                  Select a user
                </InputLabel>
                <Field
                  required
                  name="user"
                  id="user"
                  className={classes.select}
                  component={renderSelectField}
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {users.map(option => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="role" shrink>
                  Select a role
                </InputLabel>
                <Field
                  required
                  name="role"
                  id="role"
                  className={classes.select}
                  component={renderSelectField}
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {Object.keys(ROLES).map((role: string) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

const ReduxRolesForm = reduxForm<RolesFormProps, RolesDispatchProps>({
  form: "rolesForm"
})(RolesForm)

export { ReduxRolesForm as RolesForm }

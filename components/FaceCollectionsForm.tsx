import React, { FunctionComponent } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Box, FormControl, InputLabel, Select } from "@material-ui/core"

import { Collection } from "../global"

interface FaceCollectionsFormProps {
  onSelectionChanged: (collection: Collection) => void
  collections: Collection[]
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    color: theme.palette.text.secondary
  }
}))

const FaceCollectionsForm: FunctionComponent<FaceCollectionsFormProps> = ({
  onSelectionChanged,
  collections
}) => {
  const classes = useStyles({})

  const handleSelectionChanged = (selected: string) => {
    onSelectionChanged(collections.find(collection => collection._id === selected))
  }

  return (
    <Box>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="collection" shrink>
              Existing Collections
            </InputLabel>
            <Select
              native
              required
              name="collection"
              id="collection"
              className={classes.select}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                handleSelectionChanged(event.target.value)
              }}
              fullWidth
            >
              <option value="" disabled>
                -- Please Select --
              </option>
              {collections.map(option => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export { FaceCollectionsForm }

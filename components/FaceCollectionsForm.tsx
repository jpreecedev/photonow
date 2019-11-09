import React, { FunctionComponent } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Box, FormControl, InputLabel, Select, Typography } from "@material-ui/core"

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

  const renderNoCollections = () => (
    <Typography component="p" gutterBottom>
      It looks like you haven&apos;t created any collections yet.
    </Typography>
  )

  const renderCollections = () => (
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
  )

  return (
    <Box>
      <Grid container spacing={3} direction="column">
        <Grid item>
          {!(collections || !collections.length) && renderNoCollections()}
          {collections && collections.length > 0 && renderCollections()}
        </Grid>
      </Grid>
    </Box>
  )
}

export { FaceCollectionsForm }

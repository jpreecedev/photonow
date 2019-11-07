import React from "react"
import MaterialTable, { Column } from "material-table"

interface TableProps<T extends object> {
  onRowDelete: (data: T) => Promise<void>
  state: TableState<T>
}

export interface TableState<T extends object> {
  columns: Array<Column<T>>
  data: T[]
}

const Table: <T extends object>(p: TableProps<T>) => React.ReactElement<TableProps<T>> = ({
  onRowDelete,
  state
}) => {
  if (!state || !state.columns) {
    return null
  }

  return (
    <MaterialTable
      title="Face Recognition Collections"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowDelete
      }}
    />
  )
}

export { Table }

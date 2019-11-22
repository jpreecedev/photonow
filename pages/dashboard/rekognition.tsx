import React from "react"
import { NextPage } from "next"
import { Grid } from "@material-ui/core"

import { Table, TableState } from "../../components/Table/Table"
import { MainLayout } from "../../layouts/main"
import { Rekognition as AWSRekognition } from "aws-sdk"
import * as server from "../../utils/server"

interface TableData {
  collectionId: string
}

interface RekognitionProps {}

const Rekognition: NextPage<RekognitionProps> = () => {
  const [state, setState] = React.useState<TableState<TableData>>(null)

  const fetchData = async () => {
    const { success, data } = await server.getAsync<AWSRekognition.CollectionIdList>("/face")

    if (!success) {
      console.log("ERROR", data)
      return
    }

    setState({
      columns: [{ title: "Collection Id", field: "collectionId" }],
      data: data.map(item => ({ collectionId: item }))
    })
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const onRowDelete = (oldData: TableData): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(async () => {
        resolve()
        const { success } = await server.deleteAsync("/face", {
          collectionId: oldData.collectionId
        })
        if (success) {
          setState(prevState => {
            const data = [...prevState.data]
            data.splice(
              data.findIndex(x => x.collectionId === oldData.collectionId),
              1
            )
            return { ...prevState, data }
          })
        }
      }, 600)
    })
  }

  return (
    <MainLayout showNavigation={true} title="AWS Rekognition" maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <Table state={state} onRowDelete={onRowDelete} />
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Rekognition

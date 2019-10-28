import React from "react"
import { NextPage } from "next"

import { MainLayout } from "../../layouts/main"
import { Typography } from "@material-ui/core"

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  return (
    <MainLayout showNavigation={true} title="Dashboard" maxWidth={false}>
      <Typography component="p" gutterBottom>
        Nothing to show, see navigation menu.
      </Typography>
    </MainLayout>
  )
}

export default Dashboard

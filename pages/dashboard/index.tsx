import React from "react"
import { NextPage } from "next"
import { Typography } from "@material-ui/core"

import { MainLayout } from "../../layouts/main"

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  React.useEffect(() => {
    window.location.href = "/dashboard/collections"
  }, [])

  return (
    <MainLayout showNavigation={true} title="Dashboard" maxWidth={false}>
      <Typography component="p" gutterBottom>
        Nothing to show, see navigation menu.
      </Typography>
      <Typography component="p" gutterBottom>
        If you are not redirected, <a href="/dashboard/collections">click here</a>.
      </Typography>
    </MainLayout>
  )
}

export default Dashboard

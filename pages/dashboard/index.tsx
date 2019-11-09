import React from "react"
import { NextPage } from "next"
import { Typography } from "@material-ui/core"

import { MainLayout } from "../../layouts/main"
import { User } from "../../global"
import { getUserFromJwt } from "../../utils/cookies"

interface DashboardProps {
  user: User
}

const Dashboard: NextPage<DashboardProps> = () => {
  const user = getUserFromJwt()

  return (
    <MainLayout showNavigation={true} title="Dashboard" maxWidth={false}>
      {user && (
        <Typography component="p" gutterBottom>
          Welcome, {user.email} ({user.role})
        </Typography>
      )}
      <Typography component="p" gutterBottom>
        There is nothing here at the minute, please use the menu to decide what to do next.
      </Typography>
    </MainLayout>
  )
}

export default Dashboard

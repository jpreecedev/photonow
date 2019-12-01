import React from "react"
import { NextPage } from "next"
import { Typography, Box } from "@material-ui/core"

import { MainLayout } from "../../layouts/main"
import { User } from "../../global"
import { getUserFromJwt } from "../../utils/cookies"
import { FileUpload } from "../../components/FileUpload"

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
      <Box mt={5}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Upload pictures to our global collection
        </Typography>
        <FileUpload url={`/api/moments/5de3361b401d663d772185d0`} />
      </Box>
    </MainLayout>
  )
}

export default Dashboard

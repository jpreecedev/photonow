import React from "react"
import { Typography } from "@material-ui/core"
import { useRouter } from "next/router"

import { GoogleLoginButton } from "./GoogleLoginButton"
import { FacebookLoginButton } from "./FacebookLoginButton"

const SocialLoginProviders = () => {
  const router = useRouter()
  const type = router.query.type as string

  return (
    <>
      <Typography variant="overline" display="block" gutterBottom>
        Social Login Providers
      </Typography>
      <GoogleLoginButton />
      <FacebookLoginButton type={type} />
    </>
  )
}

export { SocialLoginProviders }

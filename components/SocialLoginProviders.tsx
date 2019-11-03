import React from "react"
import { Typography } from "@material-ui/core"

import { GoogleLoginButton } from "./GoogleLoginButton"
import { FacebookLoginButton } from "./FacebookLoginButton"

const SocialLoginProviders = () => {
  return (
    <>
      <Typography variant="overline" display="block" gutterBottom>
        Social Login Providers
      </Typography>
      <GoogleLoginButton />
      <FacebookLoginButton />
    </>
  )
}

export { SocialLoginProviders }

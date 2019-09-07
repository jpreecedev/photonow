import React from "react"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import SvgIcon from "@material-ui/core/SvgIcon"
import { Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    backgroundColor: "#DD4B39",
    color: "white",
    letterSpacing: "0.25px",
    width: "100%",
    textTransform: "uppercase",
    textAlign: "center",
    borderRadius: "4px",
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const GoogleLoginButton = () => {
  const classes = useStyles({})

  return (
    <Link className={classes.button} href="/api/auth/google">
      <SvgIcon viewBox="0 0 488 512" style={{ marginRight: "8px" }}>
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        />
      </SvgIcon>
      Login with Google
    </Link>
  )
}

export { GoogleLoginButton }

import React from "react"
import Link from "@material-ui/core/Link"
import SvgIcon from "@material-ui/core/SvgIcon"

const FacebookLoginButton = () => {
  return (
    <Link
      href="/api/auth/facebook"
      style={{
        backgroundColor: "#4267b2",
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
        textDecoration: "none"
      }}
    >
      <SvgIcon
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="#000000"
        style={{ marginRight: "8px" }}
      >
        <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z" />
      </SvgIcon>
      Login with Facebook
    </Link>
  )
}

export { FacebookLoginButton }

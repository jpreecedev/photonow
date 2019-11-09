import { User } from "../global"

const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)")
    return v ? v[2] : null
  }
  return null
}

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )

  return JSON.parse(jsonPayload)
}

const getUserFromJwt = (): User => {
  const jwt = getCookie("jwt")
  if (jwt) {
    const parsed = parseJwt(jwt)
    if (parsed) {
      return parsed.data as User
    }
  }
  return undefined
}

export { getCookie, getUserFromJwt, parseJwt }

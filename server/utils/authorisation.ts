import { Response, NextFunction } from "express"

const basic = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect("/login")
}

export default {
  basic
}

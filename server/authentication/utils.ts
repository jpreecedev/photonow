import { Response, NextFunction } from "express"
import { UserRequest, ClientResponse } from "../../global"

const checkIfLoggedIn = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "You are already signed in!" })
  }
  return next()
}

export { checkIfLoggedIn }

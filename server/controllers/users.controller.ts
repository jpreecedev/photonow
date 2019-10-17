import { Response } from "express"
import { getAllUsers } from "../database/user"
import { errorHandler } from "../utils"
import { ClientResponse, DatabaseUser } from "../../global"

async function get(req: Request, res: Response) {
  try {
    const users = await getAllUsers()

    return res.status(200).json(<ClientResponse<DatabaseUser[]>>{
      success: true,
      data: users
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

export default { get }

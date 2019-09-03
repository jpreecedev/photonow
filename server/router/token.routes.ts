import express, { Response } from 'express'
import { authorisation } from '../utils'

const router = express.Router()

router.get('/check', authorisation.basic, (req: RequestWithUser, res: Response) => {
  return res.status(200).json(req.user)
})

export default router

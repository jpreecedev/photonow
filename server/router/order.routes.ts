import express from "express"
import { OrderController } from "../controllers"
import { authorisation } from "../utils"

const router = express.Router()

router.get(
  "/:orderId",
  authorisation.isAuthenticated,
  // @ts-ignore
  OrderController.get
)

export default router

import express from "express"
import { OrderController } from "../controllers"
import { authorisation } from "../utils"

const router = express.Router()

router.get(
  "/:orderId",
  authorisation.basic,
  // @ts-ignore
  OrderController.get
)

export default router

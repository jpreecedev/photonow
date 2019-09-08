import express from "express"
import { OrderController } from "../controllers"

const router = express.Router()

router.get(
  "/:orderId",
  // @ts-ignore
  OrderController.get
)

export default router

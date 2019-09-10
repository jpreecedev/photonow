import express from "express"
import { PaymentController } from "../controllers/"

const router = express.Router()

router.post("/", PaymentController.post)

export default router

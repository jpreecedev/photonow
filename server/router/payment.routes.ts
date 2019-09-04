import express from "express"
import { PaymentController } from "../controllers/"
import { authorisation } from "../utils"

const router = express.Router()

router.post("/", authorisation.isAuthenticated, PaymentController.post)

export default router

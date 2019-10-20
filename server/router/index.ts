import { Express } from "express"
import momentsRouter from "./moments.routes"
import paymentRoutes from "./payment.routes"
import orderRoutes from "./order.routes"
import faceRoutes from "./face.routes"
import authRoutes from "./auth.routes"
import usersRoutes from "./users.routes"
import collectionsRoutes from "./collections.routes"

function Router(app: Express) {
  app.use(`${process.env.BASE_API_URL}/moments`, momentsRouter)
  app.use(`${process.env.BASE_API_URL}/payment`, paymentRoutes)
  app.use(`${process.env.BASE_API_URL}/order`, orderRoutes)
  app.use(`${process.env.BASE_API_URL}/face`, faceRoutes)
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
  app.use(`${process.env.BASE_API_URL}/users`, usersRoutes)
  app.use(`${process.env.BASE_API_URL}/collections`, collectionsRoutes)
}

export default Router

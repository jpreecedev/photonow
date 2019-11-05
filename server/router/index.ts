import { Express } from "express"
import bodyParser from "body-parser"
import momentsRouter from "./moments.routes"
import orderRoutes from "./order.routes"
import faceRoutes from "./face.routes"
import authRoutes from "./auth.routes"
import usersRoutes from "./users.routes"
import collectionsRoutes from "./collections.routes"
import stripeRawRoutes from "./stripe-raw.routes"
import stripeJsonRoutes from "./stripe-json.routes"

function Router(app: Express) {
  // Must pass raw request for stripe signature verification
  app.use(
    `${process.env.BASE_API_URL}/stripe-hooks`,
    bodyParser.raw({ type: "*/*" }),
    stripeRawRoutes
  )

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(`${process.env.BASE_API_URL}/stripe`, stripeJsonRoutes)

  app.use(`${process.env.BASE_API_URL}/moments`, momentsRouter)
  app.use(`${process.env.BASE_API_URL}/order`, orderRoutes)
  app.use(`${process.env.BASE_API_URL}/face`, faceRoutes)
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
  app.use(`${process.env.BASE_API_URL}/users`, usersRoutes)
  app.use(`${process.env.BASE_API_URL}/collections`, collectionsRoutes)
}

export default Router

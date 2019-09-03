import { Express } from 'express'
import momentsRouter from './moments.routes'
import paymentRoutes from './payment.routes'
import orderRoutes from './order.routes'
import authRoutes from './auth.routes'
import tokenRoutes from './token.routes'
import faceRoutes from './face.routes'

const BASE_API_URL = '/api'

function Router(app: Express) {
  app.use(`${BASE_API_URL}/moments`, momentsRouter)
  app.use(`${BASE_API_URL}/payment`, paymentRoutes)
  app.use(`${BASE_API_URL}/order`, orderRoutes)
  app.use(`${BASE_API_URL}/auth`, authRoutes)
  app.use(`${BASE_API_URL}/token`, tokenRoutes)
  app.use(`${BASE_API_URL}/face`, faceRoutes)
}

export default Router

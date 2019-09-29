require("dotenv").config()

import express from "express"
import next from "next"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import passport from "passport"
import router from "./router"
import { connectToDatabase } from "./database/connection"
import { jwt, google } from "./authentication"
import { Handlers, init } from "@sentry/node"
import compression from "compression"

const port = parseInt(process.env.PORT || "", 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()
  app.use(compression())

  init({ dsn: "https://bd58a1b715494744b2bc3b9c444172d1@sentry.io/1727049" })

  app.use(Handlers.requestHandler())
  app.use(cors())

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(passport.initialize())

  router(app)
  jwt.createStrategy()
  google.createStrategy(app)

  app.get("*", (req, res) => {
    return handle(req, res)
  })
  ;(async () => {
    await connectToDatabase()
  })()

  app.use(Handlers.errorHandler())

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on ${process.env.SERVER_URL}`)
    console.log(`${process.env.NODE_ENV}`)
  })
})

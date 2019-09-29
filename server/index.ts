require("dotenv").config()

import express from "express"
import next from "next"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import passport from "passport"
import { Handlers, init } from "@sentry/node"
import compression from "compression"

import router from "./router"
import { connectToDatabase } from "./database/connection"
import { initialiseAuthentication, utils } from "./auth"
import { UserRoles } from "../global"

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
  initialiseAuthentication(app)

  app.get(
    "/dashboard",
    passport.authenticate("jwt", { failureRedirect: "/login" }),
    utils.checkIsInRole(UserRoles.Admin, UserRoles.Photographer),
    (req, res) => {
      return handle(req, res)
    }
  )

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

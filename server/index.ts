require("dotenv").config()

import express from "express"
import next from "next"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import session from "express-session"
import mongoStore from "connect-mongo"
import passport from "passport"
import router from "./router"
import { connectToDatabase } from "./database/connection"
import { applyMiddleware } from "./utils/authorisation"

const port = parseInt(process.env.PORT || "", 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()
  const MongoStore = mongoStore(session)

  app.use(cors())

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use(
    session({
      name: "FindMyFace",
      secret: process.env.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure:
          process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https")
            ? true
            : false,
        maxAge: process.env.SERVER_URL.includes("https")
          ? Date.now() + 60 * 60 * 1000 * 4
          : null,
        domain:
          process.env.NODE_ENV == `production`
            ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
            : ""
      },
      store: new MongoStore({
        mongooseConnection: mongoose.createConnection(process.env.DB_CONNECTION_STRING)
      })
    })
  )

  app.use(passport.initialize(), passport.session())

  router(app)
  applyMiddleware()

  app.get("/getting-started", (req, res) => {
    return nextApp.render(req, res, "/getting-started")
  })

  app.get("/login", (req, res) => {
    return nextApp.render(req, res, "/login")
  })

  app.get("/register", (req, res) => {
    return nextApp.render(req, res, "/register")
  })

  app.get("*", (req, res) => {
    return handle(req, res)
  })
  ;(async () => {
    await connectToDatabase()
  })()

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

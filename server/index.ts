require("dotenv").config()

import express from "express"
import next from "next"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import router from "./router"
import { connectToDatabase } from "./database/connection"
import { applyMiddleware } from "./utils/authorisation"

const port = parseInt(process.env.PORT || "", 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(cors())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  router(app)
  applyMiddleware()

  app.get("/getting-started", (req, res) => {
    return nextApp.render(req, res, "/getting-started")
  })

  app.get("/login", (req, res) => {
    return nextApp.render(req, res, "/login")
  })

  app.get("*", (req, res) => {
    return handle(req, res)
  })
  ;(async () => {
    await connectToDatabase()
    console.log("Connected to Mongo")
  })()

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

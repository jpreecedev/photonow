import express, { Response, Request, NextFunction } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { addOrUpdate, getUserBy } from "../database/user"

const router = express.Router()

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "user_photos"]
  })
)

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login-failed" }),
  (req: UserRequest, res: Response) => {
    if (req.user.selectedPhoto) {
      return res.redirect("/profile")
    }

    req.user

    return res.redirect("/upload")
  }
)

router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    if (info) {
      return res.status(500).send(info)
    }

    req.logIn(user, async err => {
      const dbUser = await getUserBy({ username: user.username })
      const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET || "")
      res.status(200).send({
        auth: true,
        token,
        message: "Logged in."
      })
    })
  })(req, res, next)
)

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate("register", (err, user, info) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    if (info) {
      return res.status(500).send(info)
    }

    req.logIn(user, async err => {
      if (err) {
        console.log(err)
        return res.sendStatus(500)
      }

      try {
        const user = await getUserBy({ username: req.body.email })

        await addOrUpdate(<User>{
          id: user.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        })

        return res.sendStatus(200)
      } catch (error) {
        console.log(error)

        return res.sendStatus(500)
      }
    })
  })(req, res, next)
)

export default router

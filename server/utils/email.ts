import SES from "node-ses"
import { Email } from "../../global"

const client = SES.createClient({
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY
})

const sendEmail = (email: Email): Promise<SES.SendEmailData | SES.SendEmailError> => {
  return new Promise((resolve, reject) => {
    client.sendEmail(email, (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

export { sendEmail }

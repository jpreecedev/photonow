/* eslint-disable no-console */
import { captureException } from "@sentry/node"
import { log } from "."

function handle(error: string) {
  captureException(error)
  log(error, "error")
}

export default { handle }

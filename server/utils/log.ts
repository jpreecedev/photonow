const dev = process.env.NODE_ENV !== "production"

function log(message: string, type: "log" | "error" | "warn" = "log") {
  if (dev) {
    console[type](message)
  }
}

export { log }

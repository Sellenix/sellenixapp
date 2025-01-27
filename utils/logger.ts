import fs from "fs"
import path from "path"

const LOG_DIR = path.join(process.cwd(), "logs")

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}

export function log(message: string, level: "info" | "warn" | "error" = "info") {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`

  const logFile = path.join(LOG_DIR, `${level}.log`)
  fs.appendFileSync(logFile, logMessage)

  if (process.env.NODE_ENV !== "production") {
    console.log(logMessage)
  }
}

export const logger = {
  info: (message: string) => log(message, "info"),
  warn: (message: string) => log(message, "warn"),
  error: (message: string) => log(message, "error"),
}


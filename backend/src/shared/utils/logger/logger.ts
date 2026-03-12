import pino, { Logger } from "pino";
import path from "path";
import fs from "fs";

const isDev = process.env.NODE_ENV === "development";

const logsDir = path.resolve(process.cwd(), "logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

let logger: Logger;

if (isDev) {
  // Development: pretty logs in console
  logger = pino({
    level: "debug",
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        singleLine: true,
      },
    },
  });
} else {
  // Production: log to file
  const transport = pino.transport({
    target: "pino/file",
    options: {
      destination: path.join(logsDir, "app.log"),
    },
  });

  logger = pino(
    {
      level: "info",
    },
    transport,
  );
}

export default logger;

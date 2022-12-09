import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: "error",
      maxsize: 1024,
      maxFiles: 3
    })
  ],
  format: combine(
    label({ label: 'ChatGPT_OICQ' }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
})

export default logger
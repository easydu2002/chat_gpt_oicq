import winston, { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf } = format

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  levels: { ...winston.config.npm.levels, notice: 3 },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/error.log',
      level: 'error',
      maxsize: 10000,
      maxFiles: 5
    }),
    new transports.File({
      filename: 'log/notice.log',
      level: 'notice',
      maxsize: 10000,
      maxFiles: 5
    })
  ],
  format: combine(
    label({ label: 'ChatGPT_OICQ' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  )
})

export default logger

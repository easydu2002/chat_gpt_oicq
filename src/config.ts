import { config as loadConfig } from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

loadConfig()

export const config = {
  adminQQ: Number(process.env.adminQQ) || 0,
  qq: Number(process.env.qq) || 0,
  password: process.env.password,
  token: process.env.token as string,
  clearanceToken: process.env.clearanceToken as string,
  userAgent: process.env.userAgent as string,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY as string
}

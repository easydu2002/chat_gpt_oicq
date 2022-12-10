import { config as loadConfig } from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

loadConfig()

export const config = {
  adminQQ: Number(process.env.adminQQ) || 0,
  qq: Number(process.env.qq) || 0,
  token: process.env.token
}

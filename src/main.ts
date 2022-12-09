import { ChatGPTAPI } from 'chatgpt'
import { createClient } from "oicq"
import { config } from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import schedule from 'node-schedule'
import { validEnv, writeEnv } from './util/env';
import { createLogger, transports } from 'winston';
import logger from './util/log';

config();

const qq = Number(process.env.qq as string)
const token = process.env.token as string

async function main() {

  await validEnv()

  const client = createClient(qq)

  const api = new ChatGPTAPI({ sessionToken: token })
  await api.ensureAuth()

  // 早上四点尝试刷新token
  schedule.scheduleJob('0 0 4 * * ?', () => {
    api.refreshAccessToken()
      .then(token => writeEnv({ qq, token }))
      .catch(logger.error)
  })
  const trackSession = api.getConversation()

  client.on("message", async e => {
    
    // 私信或at回复
    if(e.message_type === 'private' || e.atme) {
      const raw_message = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
      if(!raw_message) {
        return e.reply(`(●'◡'●)`, true)
      }
      try {
        const response = await trackSession.sendMessage(raw_message, {
          timeoutMs: 2 * 60 * 1000
        })
        api.refreshAccessToken()
        e.reply(response, true) //true表示引用对方的消息
      }catch(err) {
        logger.error(err)
        e.reply('出现错误，请稍后再试' + err, true)
      }
    }

  })

  client.on("system.login.qrcode", function (e) {
    //扫码后按回车登录
    process.stdin.once("data", () => {
      this.login()
    })
  }).login()
}

main()
  .then(console.log)
  .catch(logger.error)
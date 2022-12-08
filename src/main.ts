import { ChatGPTAPI } from 'chatgpt'
import { createClient } from "oicq"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

(async () => {
  const api = new ChatGPTAPI({ sessionToken: process.env.token as string })
  await api.ensureAuth()
  const client = createClient(Number(process.env.qq as string))

  client.on("message", async e => {

    // 私聊消息处理
    if(e.message_type === 'private' || !e.raw_message.trim()) {
      const response = await api.sendMessage(e.raw_message, {
        timeoutMs: 2 * 60 * 1000
      })
      e.reply(response, true) //true表示引用对方的消息
    }
    
    // 非私信消息处理
    if(!e.message.find(item => item.type === 'at')) return
    const raw_message = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
    if(!raw_message) return
    const response = await api.sendMessage(raw_message, {
      timeoutMs: 2 * 60 * 1000
    })
    e.reply(response, true) //true表示引用对方的消息
  })

  client.on("system.login.qrcode", function (e) {
    //扫码后按回车登录
    process.stdin.once("data", () => {
      this.login()
    })
  }).login()
})()


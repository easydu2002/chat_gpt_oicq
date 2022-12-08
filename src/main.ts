import { ChatGPTAPI } from 'chatgpt'
import { createClient } from "oicq"
import { config } from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

config();

async function main() {
  const qq = Number(process.env.qq as string)
  const api = new ChatGPTAPI({ sessionToken: process.env.token as string })
  await api.ensureAuth()
  const client = createClient(qq)
  const trackSession = api.getConversation()

  client.on("message", async e => {

    // 上次会话超过10分钟清除上下文信息
    // if(Date.now() - Number(lastId) > 1000 * 60 * 10) {
    //   lastId = undefined
    // }
    // 私信或at回复
    if(e.message_type === 'private' || e.atme) {
      const raw_message = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
      if(!raw_message) return
      try {
        const response = await trackSession.sendMessage(raw_message, {
          timeoutMs: 2 * 60 * 1000
        })
        e.reply(response, true) //true表示引用对方的消息
      }catch(err) {
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
  .catch((err) => {
    console.trace(err)
    // main()
  })

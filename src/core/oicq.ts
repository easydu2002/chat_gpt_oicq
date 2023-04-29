import { type Client, createClient } from 'icqq'
import { config } from 'src/config'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler, MessageEvent, MessageHandler } from 'src/types'
import logger from 'src/util/log'
import inquirer from 'inquirer'

let client: Client
let messageHandler: Array<MessageHandler | BaseMessageHandler>

async function handleMessage (e: MessageEvent) {
  const sender = new Sender(e)
  try {
    for (let i = 0; i < messageHandler.length; i++) {
      let isStop = false
      if (messageHandler[i] instanceof BaseMessageHandler) {
        isStop = !await (messageHandler[i] as BaseMessageHandler).handle(sender)
      } else if (typeof messageHandler[i] === 'function') {
        isStop = !await (messageHandler[i] as MessageHandler)(sender)
      }
      if (isStop) {
        return
      }
    }
  } catch (err) {
    logger.error(err)
    sender.reply(`发生错误: ${err}`)
  }
}

export async function initOicq (initMessageHandler?: Array<MessageHandler | BaseMessageHandler>) {
  messageHandler = initMessageHandler ?? messageHandler ?? []
  await client?.logout()
  client = createClient({
    log_level: 'warn',
    data_dir: process.cwd() + '/data'
    // platform: config.oicq?.platform ?? 1
  })
  client.on('message', async e => {
    // 私信或at回复
    if (e.message_type === 'private' || e.atme) {
      handleMessage(e)
    }
  })

  client.on('system.online', () => {
    client.sendPrivateMsg(config.adminQQ, '已上线~')
  })

  doLogin(client)

  return client
}

function doLogin (client: Client) {
  client.on('system.login.slider', function (e) {
    inquirer.prompt({ type: 'input', message: '输入ticket：...\n', name: 'ticket' })
      .then(({ ticket }) => this.submitSlider(String(ticket).trim()))
  })

  client.on('system.login.device', function (e) {
    client.sendSmsCode()
    inquirer.prompt({ type: 'input', message: '请输入手机验证码...\n', name: 'code' })
      .then(({ code }) => this.submitSmsCode(String(code).trim()))
  })

  client.on('system.login.qrcode', function (e) {
    inquirer.prompt({ type: 'input', message: '回车刷新二维码，等待扫码中...\n', name: 'enter' })
      .then(() => { this.login() })
  })

  client.login(+config.botQQ, config.botPassword)
}

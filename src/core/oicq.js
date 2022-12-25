import inquirer from 'inquirer'
import { createClient } from 'oicq'
import { GuildApp } from 'oicq-guild'
import { config } from '../config.js'
import { BaseMessageHandler } from '../handler/base.js'
import { Sender } from '../model/sender.js'
import { logger } from '../util/log.js'

/**
 * @type {Client}
 */
let client
/**
 * @type {Array<MessageHandler | BaseMessageHandler>}
 */
let messageHandler

/**
 *
 * @param {MessageEvent} e
 * @returns
 */
async function handleMessage (e) {
  const sender = new Sender(e)
  try {
    for (let i = 0; i < messageHandler.length; i++) {
      let isStop = false
      if (messageHandler[i] instanceof BaseMessageHandler) {
        isStop = !await (messageHandler[i]).handle(sender)
      } else if (typeof messageHandler[i] === 'function') {
        isStop = !await (messageHandler[i])(sender)
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

/**
 *
 * @param {Array<MessageHandler | BaseMessageHandler>} [initMessageHandler]
 * @returns
 */
export async function initOicq (initMessageHandler) {
  messageHandler = initMessageHandler ?? messageHandler ?? []
  await client?.logout()
  client = createClient(config.botQQ, {
    log_level: 'warn',
    data_dir: process.cwd() + '/data'
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

  const app = GuildApp.bind(client)
  app.on('message', e => {
    const isAt = e.message.some(item => item.id === app.tiny_id)
    if (isAt) {
      handleMessage(e)
    }
  })

  doLogin(client)

  return client
}

/**
 *
 * @param {Client} client
 */
function doLogin (client) {
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

  client.login(config.botPassword)
}

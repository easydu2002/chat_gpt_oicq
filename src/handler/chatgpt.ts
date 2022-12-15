import { getChatGPTSession, getChatGPTApi } from 'src/core/chat-gpt'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'

export class ChatGPTHandler extends BaseMessageHandler {
  name = 'api'

  config = {
    enable: false,
    email: '',
    password: ''
  }

  async load (config: Object) {
    super.load(config)
    if (!this.config.enable) return
    await getChatGPTApi()
  }

  handle = async (sender: Sender) => {
    if (!this.config.enable) return true

    const api = await getChatGPTApi()
    if (!api) return true
    const trackSession = getChatGPTSession()
    try {
      const response = await trackSession.sendMessage(filterTokens(sender.textMessage))
      sender.reply(response)
    } catch (err) {
      this.messageErrorHandler(sender, err)
      logger.error(err)
    }
    return false
  }

  messageErrorHandler (sender: Sender, err: any) {
    // if (err instanceof ChatGPTError) {
    if (err.message === 'ChatGPT invalid session token') {
      sender.reply('token 无效')
    } else if (err.message === 'ChatGPT failed to refresh auth token. Error: session token may have expired') {
      sender.reply('token 过期，请使用/token set 重新设置token')
    } else if (err.message === 'ChatGPT failed to refresh auth token. TypeError: fetch failed') {
      // （后续加个配置文件自己处理错误消息吧
      sender.reply('emmm... 脑子掉线啦，可以再说一遍吗~~')
    } else if (err.message === 'ChatGPT timed out waiting for response') {
      sender.reply('连接超时，请稍后再试~')
    } else if (err.message === 'ChatGPTAPI error 429') {
      sender.reply('问的太快啦，让我先想想!')
    } else {
      sender.reply(`发生错误\n${err}`)
    }
  }
}

import { ChatGPTAPIBrowser, ChatResponse } from 'chatgpt'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'

interface ChatGPTConfig {
  enable: boolean
  email: string
  password: string
  browserPath: string
}

export class ChatGPTHandler extends BaseMessageHandler {
  name = 'api'

  config: ChatGPTConfig = {
    enable: false,
    email: '',
    password: '',
    browserPath: ''
  }

  _api: ChatGPTAPIBrowser

  _trackSession: ChatResponse

  async load (config: ChatGPTConfig) {
    super.load(config)
    if (!this.config.enable) return
    await this.initChatGPT()
  }

  async initChatGPT () {
    if (!this.config.enable) return
    const { email, password } = this.config
    this._api = new ChatGPTAPIBrowser({ email, password })
    await this._api.initSession()
  }

  async reboot () {
    await this.initChatGPT()
  }

  handle = async (sender: Sender) => {
    if (!this.config.enable) return true

    try {
      const response = await this._api.sendMessage(filterTokens(sender.textMessage), {
        conversationId: this._trackSession?.conversationId,
        parentMessageId: this._trackSession?.messageId
      })
      this._trackSession = response

      sender.reply(this._trackSession.response, true)
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

import { config } from 'src/config'
import { Sendable } from 'oicq'
import { MessageEvent } from 'src/types'

/**
 * 消息对象的封装
 */
export class Sender {
  isAdmin: boolean
  /**
   * 文本信息（不含@）
   */
  textMessage: string
  _eventObject: MessageEvent

  constructor (e: MessageEvent) {
    this._eventObject = e
    this.isAdmin = e.sender.user_id === Number(config.adminQQ)
    this.textMessage = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
  }

  reply (content: Sendable, quote?: boolean) {
    this._eventObject.reply(content, quote)
  }
}

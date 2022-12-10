import { DiscussMessageEvent, GroupMessageEvent, PrivateMessageEvent, Sendable } from 'oicq'

const adminQQ = Number(process.env.adminQQ as string)

/**
 * 消息对象的封装
 */
export class Sender {
  isAdmin: boolean
  /**
   * 文本信息（不含@）
   */
  textMessage: string
  _eventObject: PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent

  constructor (e: PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent) {
    this._eventObject = e
    this.isAdmin = e.sender.user_id === adminQQ
    this.textMessage = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
  }

  reply (content: Sendable, quote?: boolean) {
    this._eventObject.reply(content, quote)
  }
}

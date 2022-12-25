import { config } from '../config.js'

/**
 * 消息对象的封装
 */
export class Sender {
  isAdmin = false
  /**
   * 文本信息（不含@）
   */
  textMessage = ''

  /**
   * @type {MessageEvent}
   */
  _eventObject

  /**
   *
   * @param {MessageEvent} e
   */
  constructor (e) {
    this._eventObject = e
    this.isAdmin = e.sender.user_id === Number(config.adminQQ)
    this.textMessage = e.message.filter(item => item.type === 'text').map(item => item.text).join().trim()
  }

  /**
   *
   * @param {Sendable} content
   * @param {boolean} [quote]
   */
  reply (content, quote) {
    this._eventObject.reply(content, quote)
  }
}

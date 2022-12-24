import type { DiscussMessageEvent, GroupMessageEvent, PrivateMessageEvent } from 'oicq'
import type { GuildMessage } from 'oicq-guild/lib/message'
import { Sender } from './model/sender'

export interface envConfig {
  adminQQ?: string
  qq: string
  token: string
}

export type MessageEvent = PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent | GuildMessage

/**
 * 返回值取决于是否继续， true：继续，false： 中断
 */
export type MessageHandler = (sender: Sender) => boolean | Promise<boolean>

export abstract class BaseMessageHandler {
  /**
   * 加载配置的钩子
   * @param config
   */
  load (): void | Promise<void> {}

  /**
   * 重启钩子
   */
  reboot (): void | Promise<void> {}

  handle: MessageHandler
}

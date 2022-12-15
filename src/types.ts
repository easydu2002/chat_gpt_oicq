import { Sender } from './model/sender'

export interface envConfig {
  adminQQ?: string
  qq: string
  token: string
}

/**
 * 返回值取决于是否继续， true：继续，false： 中断
 */
export type MessageHandler = (sender: Sender) => boolean | Promise<boolean>

export abstract class BaseMessageHandler {
  name: string

  /**
   * 配置项，用于生成配置模板
   */
  config = {}

  /**
   * 加载配置的钩子
   * @param config
   */
  load (config: Object): void | Promise<void> { Object.assign(this.config, config) }

  /**
   * 重启钩子
   */
  reboot (): void | Promise<void> {}

  handle: MessageHandler
}

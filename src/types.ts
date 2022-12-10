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

import { doLogout, initOicq } from 'src/core/oicq'
import { BaseMessageHandler } from 'src/types'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'
import messageHandlers from './../../handler'

class ServerCommand extends BaseCommand {
  label = 'server'
  usage = [
    'stop // 停止机器人',
    'reboot // 重启机器人',
    'status // 服务器状态'
  ]

  requiredAdministrator = true
  description = '服务操作相关命令'

  async execute (sender: Sender, params: string[]) {
    switch (params[0]) {
      case 'reboot':
        sender.reply('重启中, 稍等~')
        await Promise.all(
          messageHandlers.map(async item => {
            if (item instanceof BaseMessageHandler) {
              await item.reboot()
            }
          })
        )
        await initOicq()
        break
      case 'stop':
        await doLogout()
        break
      case 'status':
        sender.reply(JSON.stringify(process.memoryUsage()), true)
        break
      default:
        sender.reply(this.helpDoc, true)
        break
    }
  }
}

export default ServerCommand

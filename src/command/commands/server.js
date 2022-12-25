import BaseCommand from '../base.js'
import { messageHandlers } from '../../handler/index.js'
import { initOicq } from '../../core/oicq.js'
import { BaseMessageHandler } from '../../handler/base.js'

class ServerCommand extends BaseCommand {
  label = 'server'
  usage = [
    'reboot // 重启机器人',
    'status // 服务器状态'
  ]

  requiredAdministrator = true
  description = '服务操作相关命令'

  async execute (sender, params) {
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

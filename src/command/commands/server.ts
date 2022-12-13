import { initChatGPT } from 'src/core/chat-gpt'
import { initOicq } from 'src/core/oicq'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'

class ServerCommand extends BaseCommand {
  label = 'server'
  usage = [
    'reboot // 重启机器人',
    'status // 服务器状态'
  ]

  requiredAdministrator = true
  description = '服务操作相关命令'

  async execute (sender: Sender, params: string[]) {
    switch (params[0]) {
      case 'reboot':
        sender.reply('重启中, 稍等~')
        await initChatGPT()
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

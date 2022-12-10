import { config } from 'src/config'
import { initChatGPT } from 'src/core/chat-gpt'
import { initQICQ } from 'src/core/oicq'
import { writeEnv } from 'src/util/env'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'

class TokenCommand extends BaseCommand {
  label = 'token'
  usage = [
    'set [token] // 设置token'
  ]

  requiredAdministrator = true

  description = 'token相关命令'

  async execute (sender: Sender, params: string[]) {
    switch (params[0]) {
      case 'set':
        // 长度小于2000直接判错吧...
        if (!params[1] || params[1].length < 2000) {
          sender.reply('请输入正确的token!')
          break
        }
        config.token = params[1]
        await writeEnv(config)
        await initChatGPT()
        sender.reply('token重置成功!')
        break
      default:
        sender.reply(this.helpDoc, true)
    }
  }
}

export default TokenCommand

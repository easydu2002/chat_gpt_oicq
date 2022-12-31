
import { resolveCommand } from 'src/command'
import { MessageHandler } from 'src/types'

export const commandHandler: MessageHandler = async function (sender) {
  const { command, params } = resolveCommand(sender.textMessage)
  if (command) {
    if (command.requiredAdministrator && !sender.isAdmin) {
      sender.reply('你没有权限使用该命令~', true)
      return false
    }
    await command.execute(sender, params)
    return false
  }
  return true
}

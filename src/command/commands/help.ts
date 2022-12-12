import commands from '.'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'

function buildHelpMessage (isAdmin: boolean) {
  const command = commands.filter(item => {
    const hasPermission = isAdmin ? item.requiredAdministrator : true
    return item.label !== 'help' && hasPermission
  })

  const content = command.map((item, key) => `${(key + 1)}: ${item.helpDoc}`).join('\n------------------\n')
  return [
    '-----------',
    '命令帮助',
    '-----------',
    content
  ].join('\n')
}

class HelpCommand extends BaseCommand {
  label = 'help'
  usage = []
  description = '帮助'
  requiredAdministrator = false
  execute (sender: Sender, params: string[]) {
    const replyMessage = buildHelpMessage(sender.isAdmin)
    sender.reply(replyMessage, true)
  }
}

export default HelpCommand

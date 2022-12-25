import commands from './index.js'
import BaseCommand from '../base.js'
/**
 *
 * @param {boolean} isAdmin
 * @returns
 */
function buildHelpMessage (isAdmin) {
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
  execute (sender, params) {
    const replyMessage = buildHelpMessage(sender.isAdmin)
    sender.reply(replyMessage, true)
  }
}

export default HelpCommand

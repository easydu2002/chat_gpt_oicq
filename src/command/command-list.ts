import { Command } from './command'
import HelpCommand from './commands/help'
import ServerCommand from './commands/server'
import TokenCommand from './commands/token'

export function getAllCommand () {
  return _commandList
}

export function getCommandByLabel (commandLabel: string) {
  return _commandList.find(item => item.label === commandLabel)
}

const _commandList: Command[] = [
  new HelpCommand(),
  new ServerCommand(),
  new TokenCommand()
]

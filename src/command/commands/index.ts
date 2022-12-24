import HelpCommand from './help'
import OfficialCommand from './official'
import ServerCommand from './server'

export default [
  new HelpCommand(),
  new ServerCommand(),
  new OfficialCommand()
]

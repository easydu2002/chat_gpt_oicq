import HelpCommand from './help.js'
import OfficialCommand from './official.js'
import ServerCommand from './server.js'

export default [
  new HelpCommand(),
  new ServerCommand(),
  new OfficialCommand()
]

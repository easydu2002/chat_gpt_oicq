import HelpCommand from './help'
import ServerCommand from './server'
import TokenCommand from './token'

export default [
  new HelpCommand(),
  new ServerCommand(),
  new TokenCommand()
]

import { ChatGPTOfficialHandler } from './chatgpt-official'
import { ChatGPTHandler } from './chatgpt'
import { commandHandler } from './command'
import { emptyHandler } from './empty'

const messageHandlers = [
  emptyHandler,
  commandHandler,
  //new ChatGPTHandler(),
  new ChatGPTOfficialHandler()
]

export default messageHandlers

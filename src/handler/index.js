import { ChatGPTOfficialHandler } from './chatgpt-official.js'
import { ChatGPTHandler } from './chatgpt.js'
import { commandHandler } from './command.js'
import { emptyHandler } from './empty.js'

export const messageHandlers = [
  emptyHandler,
  commandHandler,
  new ChatGPTHandler(),
  new ChatGPTOfficialHandler()
]

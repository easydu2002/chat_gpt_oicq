import { ChatGPTOfficialHandler } from './chatgpt-official'
import { ChatGPTHandler } from './chatgpt'
import { commandHandler } from './command'
import { emptyHandler } from './empty'

export default [
  emptyHandler,
  commandHandler,
  new ChatGPTHandler(),
  new ChatGPTOfficialHandler()
]

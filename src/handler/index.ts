import { chatGPTOfficialHandler } from './chatapt-official'
import { chatGPTHandler } from './chatgpt'
import { commandHandler } from './command'
import { emptyHandler } from './empty'

export default [
  emptyHandler,
  commandHandler,
  chatGPTHandler,
  chatGPTOfficialHandler
]

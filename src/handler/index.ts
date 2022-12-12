import { chatGPTOfficialHandler } from './chatapt-official'
import { commandHandler } from './command'
import { emptyHandler } from './empty'

export default [
  emptyHandler,
  commandHandler,
  chatGPTOfficialHandler
]

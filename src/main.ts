import { validEnv } from './util/env'
import logger from './util/log'
import { initQICQ } from './core/oicq'
import { emptyHandler } from './handler/empty'
import { chatGPTHandler } from './handler/chatgpt'
import { commandHandler } from './handler/command'
import { initChatGPT } from './core/chat-gpt'

async function main () {
  await validEnv()

  await initChatGPT()

  initQICQ([emptyHandler, commandHandler, chatGPTHandler])
}

main()
  .then(console.log)
  .catch(logger.error)

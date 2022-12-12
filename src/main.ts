import { validEnv } from './util/env'
import logger from './util/log'
import { initQICQ } from './core/oicq'
// import { initChatGPT } from './core/chat-gpt'
import MessageHandlers from './handler'

async function main () {
  await validEnv()

  // await initChatGPT()

  initQICQ(MessageHandlers)
}

main()
  .then(console.log)
  .catch(logger.error)

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason)
})

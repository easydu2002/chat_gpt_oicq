import logger from './util/log'
import { initOicq } from './core/oicq'
import MessageHandlers from './handler'
import { loadConfig, validConfigFile } from './util/config'
import { config } from './config'
import { initChatGPT } from './core/chat-gpt'

async function main () {
  await validConfigFile()
  Object.assign(config, await loadConfig())

  await initChatGPT()
  initOicq(MessageHandlers)
}

main()
  .then(console.log)
  .catch(logger.error)

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason)
})

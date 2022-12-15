import { BaseMessageHandler } from 'src/types'
import logger from './util/log'
import { initOicq } from './core/oicq'
import MessageHandlers from './handler'
import { loadConfig, validConfigFile } from './util/config'
import { config } from './config'

/**
 * 读取handler配置模板
 */
function readHandlerConfig () {
  for (let i = 0; i < MessageHandlers.length; i++) {
    if (MessageHandlers[i] instanceof BaseMessageHandler) {
      const tmp = MessageHandlers[i] as BaseMessageHandler
      config[tmp.name] = tmp.config
    }
  }
}

/**
 * 触发handler load钩子
 */
async function loadHandlerConfig () {
  for (let i = 0; i < MessageHandlers.length; i++) {
    if (MessageHandlers[i] instanceof BaseMessageHandler) {
      const tmp = MessageHandlers[i] as BaseMessageHandler
      await tmp.load(config[tmp.name])
    }
  }
}

async function loadConfigFile () {
  readHandlerConfig()
  await validConfigFile()
  Object.assign(config, await loadConfig())
  await loadHandlerConfig()
}

async function main () {
  await loadConfigFile()

  initOicq(MessageHandlers)
}

main()
  .then(console.log)
  .catch(logger.error)

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason)
})

import { BaseMessageHandler } from 'src/types'
import logger from './util/log'
import { initOicq } from './core/oicq'
import MessageHandlers from './handler'
import { existsConfig, loadConfig, writeConfig } from './util/config'
import { config } from './config'
import { run } from './auto'

/**
 * 触发handler load钩子
 */
async function loadHandlerConfig () {
  for (let i = 0; i < MessageHandlers.length; i++) {
    if (MessageHandlers[i] instanceof BaseMessageHandler) {
      await (MessageHandlers[i] as BaseMessageHandler).load()
    }
  }
}

async function main () {
  const exist = existsConfig()
  if (!exist) {
    await run()
      .then(async (conf) => {
        // merge...
        for (const key in conf) {
          if (typeof conf[key] === 'object') {
            Object.assign(config[key], conf[key])
          } else {
            config[key] = conf[key]
          }
        }
        await writeConfig(config)
      })
      .then(async () => await loadHandlerConfig())
      .then(async () => await initOicq(MessageHandlers))
      .catch(err => { throw err })
  } else {
    Object.assign(config, await loadConfig())
    await loadHandlerConfig()
    initOicq(MessageHandlers)
  }
}

main().catch(logger.error)

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason)
})

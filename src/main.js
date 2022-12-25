import { logger } from './util/log.js'
import { existsConfig, loadConfig, writeConfig } from './util/config.js'
import { messageHandlers } from './handler/index.js'
import { BaseMessageHandler } from './handler/base.js'
import { run } from './auto.js'
import { config } from './config.js'
import { initOicq } from './core/oicq.js'

/**
 * 触发handler load钩子
 */
async function loadHandlerConfig () {
  for (let i = 0; i < messageHandlers.length; i++) {
    if (messageHandlers[i] instanceof BaseMessageHandler) {
      await (messageHandlers[i]).load()
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
      .then(async () => await initOicq(messageHandlers))
      .catch(err => { throw err })
  } else {
    Object.assign(config, await loadConfig())
    await loadHandlerConfig()
    initOicq(messageHandlers)
  }
}

main().catch(logger.error)

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason)
})

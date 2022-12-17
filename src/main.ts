import { BaseMessageHandler } from 'src/types'
import logger from './util/log'
import { initOicq } from './core/oicq'
import MessageHandlers from './handler'
import { loadConfig, validConfigFile, writeConfig } from './util/config'
import { config } from './config'
import { run } from './auto'

/**
 * 读取handler配置模板
 */
function generateHandlerConfig (defaultConfig?: {}) {
  const config = {}
  for (let i = 0; i < MessageHandlers.length; i++) {
    if (MessageHandlers[i] instanceof BaseMessageHandler) {
      const tmp = MessageHandlers[i] as BaseMessageHandler
      config[tmp.name] = { ...tmp.config, ...defaultConfig ? defaultConfig[tmp.name] : {} }
    }
  }
  return config
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
async function main () {
  const exist = await validConfigFile(false)
  if (!exist) {
    await run()
      .then(async (conf) => {
        conf = Object.assign(config, ({ ...conf, ...generateHandlerConfig(conf) }))
        await writeConfig(conf)
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

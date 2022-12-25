import { config } from '../../config.js'
import { messageHandlers } from '../../handler/index.js'
import { ChatGPTOfficialHandler } from '../../handler/chatgpt-official.js'
import { writeConfig } from '../../util/config.js'
import BaseCommand from '../base.js'

/**
 *
 * @param {string} key
 * @param {*} value
 * @returns
 */
async function reloadConfig (key, value) {
  const handler = messageHandlers.find(item => item instanceof ChatGPTOfficialHandler)
  if (!handler) return
  if (!config.officialAPI[key]) {
    throw Error(`没有 officialAPI.[${key}] 配置项`)
  }
  config.officialAPI[key] = value
  handler.load()
  await writeConfig(config)
}

class OfficialCommand extends BaseCommand {
  label = 'official'
  usage = [
    'get // 获取当前配置',
    'key [key] // 设置 key',
    'model [model] // 设置 model',
    'maxTrackCount [count] // 设置会话跟踪上限',
    'identity [identity] // 设置人格（使用==连接多个）',
    'maxTokens [identity] // 设置回复消息占用token',
    'maxTrackCount [identity] // 设置人格（使用==连接多个）',
    'temperature [identity] // 设置人格（使用==连接多个）'
    // 'prop [key] [value] // 设置配置项'
  ]

  requiredAdministrator = true

  description = '官方api配置'

  async execute (sender, params) {
    switch (params[0]) {
      case 'get':
        sender.reply(JSON.stringify(config.officialAPI, null, 2))
        break
      case 'key':
      case 'model':
      case 'identity':
      case 'maxTokens':
      case 'temperature':
      case 'maxTrackCount':
        if (params[0] === 'identity') {
          await reloadConfig(params[0], params[1].split('=='))
        } else {
          await reloadConfig(params[0], params[1])
        }
        sender.reply(`${params[0]}重置成功!`)
        break
      default:
        sender.reply(this.helpDoc, true)
    }
  }
}

export default OfficialCommand

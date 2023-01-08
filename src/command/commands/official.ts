import { config } from 'src/config'
import messageHandlers from 'src/handler'
import { ChatGPTOfficialHandler } from 'src/handler/chatgpt-official'
import { writeConfig } from 'src/util/config'
import { Sender } from '../../model/sender'
import { BaseCommand } from '../command'

async function reloadConfig (sender: Sender, key: string, value: any) {
  const handler = messageHandlers.find(item => item instanceof ChatGPTOfficialHandler) as ChatGPTOfficialHandler
  if (!handler) return
  config.officialAPI[key] = value
  handler.load()
  await writeConfig(config)
  sender.reply(`已更新officialAPI.${key}为 ${value}`)
}

class OfficialCommand extends BaseCommand {
  label = 'official'
  usage = [
    'get // 获取当前配置',
    'key [key] // 设置 key',
    'model [model] // 设置 model',
    'maxTrackCount [count] // 设置会话跟踪上限',
    'identity [identity] // 设置人格（使用==连接多个）',
    'maxTokens [n] // 设置回复消息占用token',
    'maxTrackCount [n] // 设置最大记忆对话次数',
    'temperature [0-1] // 设置回答问题的概率系数 0-1',
    'name [Q] [A] // 设置问答名称'
    // 'prop [key] [value] // 设置配置项'
  ]

  requiredAdministrator = true

  description = '官方api配置'

  getUsageByProp (prop: string) {
    return `用法: ${this.usage.find(item => item.startsWith(prop))}`
  }

  async execute (sender: Sender, params: string[]) {
    const [prop, value] = params

    switch (prop) {
      case 'get':
        sender.reply(JSON.stringify(config.officialAPI, null, 2))
        break
      case 'key':
        if (!value) return sender.reply(this.getUsageByProp(prop), true)
        reloadConfig(sender, prop, value)
        break
      case 'name': {
        const [prop, QName, AName] = params
        if (!QName) return sender.reply(this.getUsageByProp(prop), true)
        reloadConfig(sender, prop, [QName || config.officialAPI.name[0], AName || config.officialAPI.name[1]])
        break
      }
      case 'model':
        if (!value) return sender.reply(this.getUsageByProp(prop), true)
        reloadConfig(sender, prop, value)
        break
      case 'identity':
        await reloadConfig(sender, prop, value?.split('==') ?? [])
        break
      case 'maxTokens': {
        if (!value) return sender.reply(this.getUsageByProp(prop), true)
        const maxTokens = Number(value)
        if (isNaN(maxTokens) || maxTokens < 0) {
          return sender.reply(`maxTokens 必须为不小于0的数字 当前设置为: ${value}`)
        }
        reloadConfig(sender, prop, maxTokens)
        break
      }
      case 'temperature': {
        if (!value) return sender.reply(this.getUsageByProp(prop), true)
        const temperature = Number(value)
        if (!value || isNaN(temperature) || temperature < 0 || temperature > 1) {
          return sender.reply(`temperature 取值范围为: 0-1 当前设置为: ${value}`)
        }
        reloadConfig(sender, prop, temperature)
        break
      }
      case 'maxTrackCount': {
        if (!value) return sender.reply(this.getUsageByProp(prop), true)
        const count = Number(value)
        if (isNaN(count) || count < 0) {
          return sender.reply(`maxTrackCount 必须为不小于0的数字 当前设置为: ${value}`)
        }
        reloadConfig(sender, prop, count)
        break
      }
      default:
        sender.reply(this.helpDoc, true)
    }
  }
}

export default OfficialCommand

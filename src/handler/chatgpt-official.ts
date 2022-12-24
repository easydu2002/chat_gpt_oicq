import { Configuration, OpenAIApi } from 'openai'
import { config } from 'src/config'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'

function messageErrorHandler (sender: Sender, err: any) {
  sender.reply(`发生错误\n${err}`)
}

export class ChatGPTOfficialHandler extends BaseMessageHandler {
  /**
  * 记录上次的对话信息 参考https://beta.openai.com/playground/p/default-chat?model=text-davinci-003
  */
  _trackMessage: string[] = []

  /**
   * 身份或提示 https://beta.openai.com/docs/guides/completion/conversation
   */
  identity = ''

  _openAI: OpenAIApi

  initOpenAI () {
    if (!config.officialAPI.enable) return

    const configuration = new Configuration({
      apiKey: config.officialAPI.key
    })
    this._openAI = new OpenAIApi(configuration)
  }

  async load () {
    this._trackMessage = new Array(config.officialAPI.maxTrackCount).fill('')
    console.log('this._trackMessage', this._trackMessage)
    this.initOpenAI()
    this.identity = this.getIdentity()
  }

  reboot () {
    this.initOpenAI()
  }

  handle = async (sender: Sender) => {
    if (!config.officialAPI.enable) return true

    try {
      const prompt = `${this.identity}\n${this.trackMessage}\nHuman: ${filterTokens(sender.textMessage)}\nAI:`
      const completion = await this._openAI.createCompletion({
        model: config.officialAPI.model,
        prompt,
        temperature: config.officialAPI.temperature,
        max_tokens: config.officialAPI.maxTokens, // https://beta.openai.com/docs/guides/completion/best-practices
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:']
      })
      const respMsg = completion.data.choices[0].text
      if (respMsg) {
      // trackMessage = status === 'stop' ? '' : `\nHuman:${respMsg}\nAI:${respMsg}`
        this.pushTrackMessage(`\nHuman:${sender.textMessage}\nAI:${respMsg}`)
        sender.reply(respMsg, true)
      } else {
        this._trackMessage.fill('')
        sender.reply('emmm....', true)
      }
    } catch (err) {
      messageErrorHandler(sender, err)
      logger.error(err)
    }
    return false
  }

  getIdentity () {
    const identity = config.officialAPI.identity

    if (identity.length === 1) {
      return filterTokens(identity[0])
    }
    if (identity.length === 2) {
      return `Human:${filterTokens(identity[0])}\nAI:${filterTokens(identity[1])}`
    }
    if (identity.length === 3) {
      return `${filterTokens(identity[0])}\nHuman:${filterTokens(identity[1])}\nAI:${filterTokens(identity[2])}`
    }
    return ''
  }

  pushTrackMessage (val: string) {
    this._trackMessage.push(val)
    this._trackMessage.shift()
  }

  get trackMessage () {
    return this._trackMessage.join('')
  }
}

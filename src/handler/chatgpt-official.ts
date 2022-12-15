import { getOpenApi } from 'src/core/openai'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'

function messageErrorHandler (sender: Sender, err: any) {
  sender.reply(`发生错误\n${err}`)
}

export class ChatGPTOfficialHandler extends BaseMessageHandler {
  name = 'officialAPI'

  config = {

    enable: true,
    key: '',
    model: 'text-davinci-003',
    identity: '' || [],
    maxTokens: 256,
    maxTrackCount: 100,
    temperature: 0.9
  }

  /**
  * 记录上次的对话信息 参考https://beta.openai.com/playground/p/default-chat?model=text-davinci-003
  */
  _trackMessage: string[] = []

  /**
   * 身份或提示 https://beta.openai.com/docs/guides/completion/conversation
   */
  identity = ''

  async load (config: Object) {
    super.load(config)
    this.identity = this.getIdentity()
  }

  handle = async (sender: Sender) => {
    if (!this.config.enable) return true

    try {
      const openAi = getOpenApi()
      const completion = await openAi.createCompletion({
        model: this.config.model,
        prompt: `${this.identity}\n${this.trackMessage}\nHuman: ${filterTokens(sender.textMessage)}\nAI:`,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens, // https://beta.openai.com/docs/guides/completion/best-practices
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: [' Human:', ' AI:']
      })
      const respMsg = completion.data.choices[0].text
      // console.log(completion.data.choices[0].finish_reason)
      if (respMsg) {
      // trackMessage = status === 'stop' ? '' : `\nHuman:${respMsg}\nAI:${respMsg}`
        this.pushTrackMessage(`\nHuman:${respMsg}\nAI:${respMsg}`)
        sender.reply(respMsg, true)
      } else {
        this._trackMessage.length = 0
        sender.reply('emmm....', true)
      }
    } catch (err) {
      messageErrorHandler(sender, err)
      logger.error(err)
    }
    return false
  }

  getIdentity () {
    const identity = this.config.identity

    if (identity.length === 1) {
      return filterTokens(identity[0])
    }
    if (identity.length === 2) {
      return `Human:${filterTokens(identity[0])}\nAI:${filterTokens(identity[1])}`
    }
    if (identity.length === 3) {
      return `${identity[0]}\nHuman:${filterTokens(identity[1])}\nAI:${filterTokens(identity[2])}`
    }
    return ''
  }

  pushTrackMessage (val: string) {
    this._trackMessage.push(val)
    this._trackMessage.splice(0, this.trackMessage.length - this.config.maxTrackCount)
  }

  get trackMessage () {
    return this._trackMessage.join('')
  }
}

import { Configuration, OpenAIApi } from 'openai'
import { config } from 'src/config'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'
import { GroupMessage } from 'oicq'
import { Session } from '../util/session'

export class ChatGPTOfficialHandler extends BaseMessageHandler {
  /**
  * 记录上次的对话信息 参考https://beta.openai.com/playground/p/default-chat?model=text-davinci-003
  */
  _trackMessage: string[] = []

  /**
   * 身份或提示 https://beta.openai.com/docs/guides/completion/conversation
   */
  identity = ''
  sessions: Map<string, Session> = new Map()

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
    this.initOpenAI()
    this.identity = this.getIdentity()
  }

  reboot () {
    this.initOpenAI()
  }

  handle = async (sender: Sender) => {
    if (!config.officialAPI.enable) return true

    let [Q, A] = config.officialAPI.name ?? config.officialAPI.stop ?? []
    Q = Q ?? 'Human'
    A = A ?? 'AI'

    const id = sender._eventObject instanceof GroupMessage ? sender._eventObject.group_id : sender._eventObject.sender.user_id
    let session = this.sessions.get(id)
    if (typeof session === 'undefined' || (new Date().getTime() - session.last_time.getTime()) > 1000 * 60 * 5) {
      session = new Session(Array.from(new Array(config.officialAPI.maxTrackCount), () => ''), new Date())
      console.log(`新建session:${id}`)
    }

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
        stop: [` ${Q}:`, ` ${A}:`]
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
      this.messageErrorHandler(sender, err)
    }
    return false
  }

  getIdentity () {
    const identity = [...config.officialAPI.identity]

    let result = ''
    if (identity.length % 2 !== 0) {
      result = filterTokens(`${identity.shift()}\n`)
    }
    for (let i = 1; i < identity.length; i += 2) {
      result += `\nHuman:${filterTokens(identity[i - 1])}\nAI:${filterTokens(identity[i])}`
    }
    return result
  }

  pushTrackMessage (val: string) {
    this._trackMessage.push(val)
    this._trackMessage.shift()
  }

  get trackMessage () {
    return this._trackMessage.join('')
  }

  messageErrorHandler (sender: Sender, err: any) {
    const errMessage = `${err.response?.status} ${err.response?.statusText} ${err.response?.data?.error?.message}` || err
    sender.reply(`发生错误\n${errMessage}`)
    logger.error(errMessage)
  }
}

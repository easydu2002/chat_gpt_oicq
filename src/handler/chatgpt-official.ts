import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { config } from 'src/config'
import { Sender } from 'src/model/sender'
import { BaseMessageHandler } from 'src/types'
import logger from 'src/util/log'
import { filterTokens } from 'src/util/message'
import { GroupMessage } from 'oicq'
import { Session } from '../util/session'

export class ChatGPTOfficialHandler extends BaseMessageHandler {
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
      this.sessions.set(id, (session = new Session([], new Date())))
      console.log(`新建session:${id}`)
    }
    const trackMessage = session.trackMessage

    try {
      let respMsg: string | undefined

      if (!config.officialAPI.enableChatGPT) {
        const history = trackMessage.length ? trackMessage.map(item => `\n${Q}:${item[0]}\n${A}:${item[1]}`).join('') : ''
        logger.info(`${id} gpt ${config.officialAPI.model} history: ${history}`)
        const prompt = `${this.identity}\n${history}\n${Q}: ${filterTokens(sender.textMessage)}\n${A}:`
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
        respMsg = completion.data.choices[0].text
      } else {
        const history: ChatCompletionRequestMessage[] =
        trackMessage
          .map(item => [{ role: ChatCompletionRequestMessageRoleEnum.User, content: item[0] }, { role: ChatCompletionRequestMessageRoleEnum.Assistant, content: item[1] }])
          .flat()
        logger.info(`${id} chatgpt ${config.officialAPI.model} history: ${history}`)
        const messages = [
          ...history,
          { role: 'user', content: filterTokens(sender.textMessage) }
        ]
        if (this.identity) messages.unshift({ role: 'system', content: filterTokens(this.identity) })

        const completion = await this._openAI.createChatCompletion({
          model: config.officialAPI.model,
          messages: [
            { role: 'system', content: this.identity },
            ...history,
            { role: 'user', content: filterTokens(sender.textMessage) }
          ],
          max_tokens: config.officialAPI.maxTokens,
          temperature: config.officialAPI.temperature
        })
        respMsg = completion.data.choices[0].message?.content
      }
      if (respMsg) {
        session.pushTrackMessage(sender.textMessage, respMsg)
        sender.reply(respMsg, true)
      } else {
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

  messageErrorHandler (sender: Sender, err: any) {
    const errMessage = `${err.response?.status ?? ''} ${err.response?.statusText ?? ''} ${err.response?.data?.error?.message ?? ''}`.trim() || err
    sender.reply(`发生错误\n${errMessage}`)
    logger.error(errMessage)
  }
}

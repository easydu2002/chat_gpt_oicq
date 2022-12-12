import { segment } from 'oicq'
import { getOpenApi } from 'src/core/openai'
import { Sender } from 'src/model/sender'
import { MessageHandler } from 'src/types'
import logger from 'src/util/log'

/**
 * 官方 openai 研究中...
 * @see https://beta.openai.com/examples
 * @param sender
 * @returns
 */
export const chatGPTOfficialHandler: MessageHandler = async function (sender) {
  try {
    const openAi = getOpenApi()
    const completion = await openAi.createCompletion({
      model: 'text-davinci-003',
      prompt: `Human: ${sender.textMessage}\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:']
    })
    sender.reply(completion.data.choices.map(item => item.text).join(), true)
  } catch (err) {
    messageErrorHandler(sender, err)
    logger.error(err)
  }
  return false
}

function messageErrorHandler (sender: Sender, err: any) {
  sender.reply(`发生错误\n${err}`)
}

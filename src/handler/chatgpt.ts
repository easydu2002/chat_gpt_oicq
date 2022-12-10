import { getCahtGPTSession, getChatGPTApi, initChatGPT } from 'src/core/chat-gpt'
import { MessageHandler } from 'src/types'
import logger from 'src/util/log'

export const chatGPTHandler: MessageHandler = async function (sender) {
  const api = getChatGPTApi()
  if (!api) return true
  const trackSession = getCahtGPTSession()
  try {
    const response = await trackSession.sendMessage(sender.textMessage)
    sender.reply(response)
  } catch (err) {
    logger.error(err)
    await initChatGPT()
    sender.reply(`发生错误，请稍后再试!\n${err}`)
  }
  return false
}

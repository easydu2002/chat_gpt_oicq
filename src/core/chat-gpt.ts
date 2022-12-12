import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt'
import { config } from 'src/config'

let api: ChatGPTAPI
let session: ChatGPTConversation

export async function initChatGPT () {
  api = new ChatGPTAPI({
    sessionToken: config.token,
    clearanceToken: config.clearanceToken,
    userAgent: config.userAgent
  })
  await api.ensureAuth()
  session = api.getConversation()
  return api
}

export function getChatGPTApi () {
  return api
}

export function getChatGPTSession () {
  return session || (session = api.getConversation())
}

import { ChatGPTAPI, ChatGPTConversation } from 'chatgpt'
import { config } from 'src/config'

let api: ChatGPTAPI
let session: ChatGPTConversation

export async function initChatGPT () {
  api = new ChatGPTAPI({
    sessionToken: config.api.token,
    clearanceToken: config.api.clearanceToken,
    userAgent: config.api.userAgent
  })
  await api.ensureAuth()
  session = api.getConversation()
  return api
}

export async function getChatGPTApi () {
  return api || await initChatGPT()
}

export function getChatGPTSession () {
  return session || (session = api.getConversation())
}

import { ChatGPTAPI, ChatGPTConversation, getBrowser, getOpenAIAuth } from 'chatgpt'
import { config } from 'src/config'

let api: ChatGPTAPI
let session: ChatGPTConversation

export async function initChatGPT () {
  const openAIAuth = await getOpenAIAuth({
    email: config.api.email,
    password: config.api.password,
    browser: await getBrowser({ executablePath: config.api.browerPath })
  })
  api = new ChatGPTAPI({ ...openAIAuth })
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

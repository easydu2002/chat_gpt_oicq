import { config } from 'src/config'
import { Configuration, OpenAIApi } from 'openai'

let openAi: OpenAIApi

export function initOpenAI () {
  const configuration = new Configuration({
    apiKey: config.officialAPI.key
  })
  openAi = new OpenAIApi(configuration)
  return openAi
}

export function getOpenApi () {
  return openAi || initOpenAI()
}

import { config } from 'src/config'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY
})

let openAi: OpenAIApi

export function getOpenApi () {
  return openAi || (openAi = new OpenAIApi(configuration))
}

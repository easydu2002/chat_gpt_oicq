import { segment } from 'oicq'
import { getOpenApi } from 'src/core/openai'
import { Sender } from 'src/model/sender'
import { MessageHandler } from 'src/types'
import logger from 'src/util/log'

/**
 * 记录上次的对话信息 参考https://beta.openai.com/playground/p/default-chat?model=text-davinci-003
 * AI:原神还拥有精彩的剧情，它特有的百科全书系统，灵宠系统，以及多种乐趣的星界冒险等让玩家可以体验不一样的游戏乐趣。此外，原神还提供了竞技模
Human: 继续说
AI: 块等多种PVP模式，让玩家可以通过VS其他玩家来体验战斗的乐趣。玩家也可以组队一起探索游戏中各种角落，特殊任务等内容，让玩家有种丰富多
  */
let trackMessage = ''

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
      prompt: `${trackMessage}\nHuman: ${sender.textMessage}\nAI:`,
      temperature: 0.9,
      max_tokens: 256, // https://beta.openai.com/docs/guides/completion/best-practices
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:']
    })
    const respMsg = completion.data.choices[0].text
    if (respMsg) {
      // trackMessage = status === 'stop' ? '' : `\nHuman:${respMsg}\nAI:${respMsg}`
      trackMessage = `\nHuman:${respMsg}\nAI:${respMsg}`
      sender.reply(respMsg, true)
    } else {
      trackMessage = ''
      sender.reply('emmm....', true)
    }
  } catch (err) {
    messageErrorHandler(sender, err)
    logger.error(err)
  }
  return false
}

function messageErrorHandler (sender: Sender, err: any) {
  sender.reply(`发生错误\n${err}`)
}

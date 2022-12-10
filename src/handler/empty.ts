import { MessageHandler } from 'src/types'

export const emptyHandler: MessageHandler = function (sender) {
  if (!sender.textMessage) {
    sender.reply('(●\'◡\'●)', true)
    return false
  }
  return true
}

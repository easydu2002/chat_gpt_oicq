
/**
 *
 * @param {Sender} sender
 * @returns
 */
export const emptyHandler = function (sender) {
  if (!sender.textMessage) {
    sender.reply('(●\'◡\'●)', true)
    return false
  }
  return true
}

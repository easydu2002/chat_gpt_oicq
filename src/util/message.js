
const replaceMapping = {
  '，': ',',
  '！': '!',
  '。': '.',
  '？': '?'
}
// const noDuplicationChar = ['，', ',', '!', '！', '?', '？', '']

/**
 * 消息 tokens优化
 * @param {string} content
 */
export function filterTokens (content) {
  // content.replaceAll(/，|。|！/g, ' ')
  let resultMessage = ''
  for (let i = 0; i < content.length; i++) {
    if (resultMessage.at(-1) === content[i]) {
      if (content[i] === ' ') continue
    }
    if (replaceMapping[content[i]] !== undefined) {
      resultMessage += replaceMapping[content[i]]
    } else {
      resultMessage += content[i]
    }
  }
  return resultMessage.trim()
}

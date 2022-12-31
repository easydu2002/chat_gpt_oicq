
const replaceMapping = {
  '，': ',',
  '！': '!',
  '。': '.',
  '？': '?'
}
// const noDuplicationChar = ['，', ',', '!', '！', '?', '？', '']

/**
 * 消息 tokens优化
 */
export function filterTokens (content: string) {
  // content.replaceAll(/，|。|！/g, ' ')
  let resultMessage = ''
  for (let i = 0; i < content.length; i++) {
    if (resultMessage.at(-1) === content[i]) {
      if (content[i] === ' ') continue
    }
    if (replaceMapping[content[i]] !== undefined) {
      resultMessage += replaceMapping[content[i]] as string
    } else {
      resultMessage += content[i]
    }
  }
  return resultMessage.trim()
}

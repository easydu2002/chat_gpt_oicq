import commandList from './commands/index.js'

/**
 *
 * @param {string} content
 * @returns
 */
export function resolveCommand (content) {
  if (!content.startsWith('/')) return { command: null, params: null }

  const [label, ...params] = content.split(' ').filter(item => !!item)
  const command = commandList.find(item => item.label === label.slice(1))
  return { command, params }
}

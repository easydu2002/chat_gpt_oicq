import commandList from './commands'

export function resolveCommand (content: string) {
  if (!content.startsWith('/')) return { command: null, params: null }

  const [label, ...params] = content.split(' ').filter(item => !!item)
  const command = commandList.find(item => item.label === label.slice(1))
  return { command, params }
}

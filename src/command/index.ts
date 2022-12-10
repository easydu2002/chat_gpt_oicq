import { getCommandByLabel } from './command-list'

export function resolveCommand (content: string) {
  if (!content.startsWith('/')) return { command: null, params: null }

  const [label, ...params] = content.split(' ').filter(item => !!item)
  const command = getCommandByLabel(label.slice(1))
  return { command, params }
}

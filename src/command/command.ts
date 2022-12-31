import { Sender } from '../model/sender'

export interface Command {

  label: string
  usage: string[]
  requiredAdministrator?: boolean
  description?: string
  helpDoc?: string
  execute: (sender: Sender, params?: string[]) => void | Promise<void>
}

export abstract class BaseCommand implements Command {
  label: string
  usage: string[]
  requiredAdministrator?: boolean | undefined
  description?: string | undefined
  get helpDoc () {
    return [
      this.description,
      '用法: ',
      ...this.usage.map(item => `/${this.label} ${item}`)
    ].join('\n')
  }

  execute (sender: Sender, params?: string[] | undefined) { throw new Error('this is abstract class!') }
}


class BaseCommand {
  label = ''
  usage = []
  requiredAdministrator = false
  description = ''
  get helpDoc () {
    return [
      this.description,
      '用法: ',
      ...this.usage.map(item => `/${this.label} ${item}`)
    ].join('\n')
  }

  /**
   *
   * @param {Sender} sender
   * @param {string[]} [params]
   */
  execute (sender, params) { throw new Error('this is abstract class!') }
}

export default BaseCommand

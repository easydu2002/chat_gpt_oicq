
export class BaseMessageHandler {
  /**
   * 加载配置的钩子
   * @returns {void | Promise<void>}
   */
  load () {}

  /**
   * 重启钩子
   * @returns {void | Promise<void>}
   */
  reboot () {}

  /**
   *
   * @param {Sender} sender
   */
  handle (sender) {}
}

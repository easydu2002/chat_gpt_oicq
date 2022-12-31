import inquirer from 'inquirer'

export async function run (): Promise<{}> {
  // const officialAPIName = (getMessageHandlerByType(ChatGPTOfficialHandler) as ChatGPTOfficialHandler).name

  const config = await inquirer.prompt([
    {
      name: 'adminQQ',
      message: '请输入管理员QQ:',
      type: 'input',
      validate (input: string) {
        if (!input || isNaN(Number(input))) {
          return '账号格式错误!'
        }
        return true
      }
    },
    {
      name: 'botQQ',
      message: '请输入机器人QQ:',
      type: 'input',
      validate (input: string) {
        if (!input || isNaN(Number(input))) {
          return '账号格式错误!'
        }
        return true
      }
    },
    {
      name: 'botPassword',
      message: '请输入机器人密码，如需扫码可跳过输入',
      type: 'input'
    },
    {
      name: 'oicq.platform',
      message: '请选择登录协议',
      type: 'list',
      choices: [
        // 1:安卓手机(默认) 2:aPad 3:安卓手表 4:MacOS 5:iPad
        { name: '安卓手机', value: 1 },
        { name: 'iPad', value: 5 },
        { name: 'MacOS', value: 4 },
        { name: '安卓手表', value: 3 },
        { name: 'aPad', value: 2 }
      ]
    }
  ])

  const apiType = (await inquirer.prompt([
    {
      name: 'apiType',
      message: '选择API源:',
      type: 'list',
      choices: [
        { name: '官方API', value: 'officialAPI' }
      ]
    }
  ])).apiType

  if (apiType === 'officialAPI') {
    config[apiType] = await inquirer.prompt([
      {
        name: 'key',
        message: 'key申请地址: https://beta.openai.com/account/api-keys\n请输入API key:',
        type: 'input',
        validate (input: string) {
          if (!input) {
            return '请输入正确的key!'
          }
          return true
        }
      }
    ])
  }
  return config
}

import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { config } from 'src/config'

const configFile = process.cwd() + '/config.json'

export async function loadConfig () {
  const str = (await readFile(configFile)).toString()
  return JSON.parse(str)
}

export async function validConfigFile () {
  if (!existsSync(configFile)) {
    console.error('请正确配置config.json文件(已在根目录自动创建，填写对应值即可)')
    await writeConfig(config)
    process.exit()
  }
}

export async function writeConfig (config: object) {
  const content = JSON.stringify(config, null, 2)
  await writeFile(configFile, content)
}

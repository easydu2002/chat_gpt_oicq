import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { config } from '../config.js'

const configFile = process.cwd() + '/config.json'

export async function loadConfig () {
  const str = (await readFile(configFile)).toString()
  return JSON.parse(str)
}

export function existsConfig () {
  return existsSync(configFile)
}

export async function validConfigFile () {
  if (!existsConfig) {
    console.error(`请正确配置config.json文件(已自动生成 ${configFile} ，填写对应值即可)`)
    await writeConfig(config)
    process.exit()
  }
}

/**
 *
 * @param {{}} config
 */
export async function writeConfig (config) {
  const content = JSON.stringify(config, null, 2)
  await writeFile(configFile, content)
  console.log(`config.json 创建成功！${configFile}`)
}

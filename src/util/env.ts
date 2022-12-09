import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { EnvConfig } from "../types";

const envFile = process.cwd() + '/.env'

export async function validEnv() {

  if (!existsSync(envFile)) {
    console.error('请正确配置.env文件(已在根目录自动创建，填写对应值即可)')
    await writeEnv({ qq: '', token: '' })
    process.exit()
  }
}

export async function writeEnv(keyValue: object) {

  const content = Object.entries(keyValue).map(item => item.join('=')).join('\n')
  await writeFile(envFile, content)
}
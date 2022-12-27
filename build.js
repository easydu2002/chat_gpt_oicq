const { readFile, writeFile } = require('fs/promises')

/**
 * 带puppeteer的话，esbuild打包完跑不起来，先这么处理一下
 */
async function patch () {
  const path = './src/handler/index.ts'
  const handlerContent = (await readFile(path)).toString().replace('new ChatGPTHandler()', '//new ChatGPTHandler()')
  await writeFile(path, handlerContent)
}
async function unpatch () {
  const path = './src/handler/index.ts'
  const handlerContent = (await readFile(path)).toString().replace('//new ChatGPTHandler()', 'new ChatGPTHandler()')
  await writeFile(path, handlerContent)
}

async function build () {
  await patch()
  require('esbuild').build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'build/app.js',
    platform: 'node',
    minify: true,
    external: [],
    plugins: []
  }).then(() => {
    require('pkg').exec('.')
  }).then(() => {
    unpatch()
  }).catch(() => {
    unpatch()
    process.exit(1)
  })
}
build()

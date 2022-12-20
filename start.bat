@echo off
chcp 65001

echo 启动中，请稍等

echo 如果使用该脚本出现异常情况，请先尝试删除目录下的 version-local 文件, 或提交问题至 https://github.com/easydu2002/chat_gpt_oicq/issues

SET RemoteVersionFile=version-remote
SET LocalVersionFile=version-local

if not exist %LocalVersionFile% (
  rmdir /s /q node_modules
  del package-lock.json

  @REM 文件不存在先建个有默认值的，不然要报错...
  echo qaq > %LocalVersionFile%
)

@REM version-remote为 依赖更新时的issue hash，通过与version-local 比较来判断是否需要重新install
SET /P RemoteVersion=<%RemoteVersionFile%
SET /p LocalVersion=<%LocalVersionFile%

npm config set puppeteer_download_host=https://npm.taobao.org/mirrors

if %RemoteVersion% NEQ %LocalVersion% ( 
  echo 正在更新依赖，请稍等...
  npm install && echo %RemoteVersion% > ./version-local && npm run dev
) else ( 
  npm run dev
)
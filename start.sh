#!/bin/bash

echo 启动中，请稍等

echo 如果使用该脚本出现异常情况，请先尝试删除目录下的 version-local 文件, 或提交问题至 https://github.com/easydu2002/chat_gpt_oicq/issues

if [ ! -f version-local ]; 
then
  rm -rf node_modules package-lock.json
  echo qaq > version-local
fi


remoteVersion=`cat version-remote`
localVersion=`cat version-local`

if [ $remoteVersion == $localVersion ];
then 
  npm run dev
else
  echo 正在更新依赖，请稍等...
  npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
  npm install && echo $remoteVersion > version-local && npm run dev
fi


![YQ`@SO_A@57DC@T$PU95MSO](https://user-images.githubusercontent.com/59076088/208228558-797a6bca-c794-4173-8d0d-176f8e9d90d6.png)


# OpenAI QQBot

基于OpenAI官方API的QQ聊天机器人



详细指南另见 [Wiki~~](https://github.com/easydu2002/chat_gpt_oicq/wiki)



<img src="https://img.shields.io/github/repo-size/easydu2002/chat_gpt_oicq" alt="dependency-version" /> <img src="https://img.shields.io/github/package-json/dependency-version/easydu2002/chat_gpt_oicq/openai?color=black" alt="dependency-version" />




## ✨当前功能

- 支持私聊、群聊、频道
- 友好的配置项，自定义人格
- 命令系统
- ~~三方API（免费）~~



## 🚀快速启动

> 注意: 扫码登录需要在局域网环境中（比如同一个热点），如果需要上云先在局域网登录，然后copy项目根目录生成的data目录即可

1. 安装 [Node.js](https://nodejs.org/en/) （版本需要 > 18）

2. 下载项目 `git clone https://github.com/easydu2002/chat_gpt_oicq.git`

3. 进入项目目录 `cd chat_gpt_oicq`

4.  windows运行 `start.bat`，linux运行 `start.sh`

5. 填写相应的信息，扫码登录即可，上线后将会收到机器人发来的已上线~ 

   

## ⌨️常用命令

- /help 查看帮助
- /token setkey 设置官方key




## ❌常见问题排查

1. **[启动错误]**  ChatGPT invalid session token

   .env 文件没有设置token


2. **[启动错误]** ChatGPT failed to refresh auth token. Error: Unauthorized

   .env 的 token 不对 

3. **[启动错误|运行错误]** ChatGPT failed to refresh auth token. Error: session token may have expired

   启动时出现: .env 配置正确的token

   运行时出现: 使用 `/token set 新token` 即可

4. **[运行错误]**  ChatGPT failed to refresh auth token. TypeError: fetch failed

   网络波动，偶尔会有这么一下，不影响



## 👀效果
![1671258691739](https://user-images.githubusercontent.com/59076088/208228888-12230387-b802-49e0-9872-3b220f4e8ddf.png)
![image](https://user-images.githubusercontent.com/59076088/206843285-9fdf53e6-a0c7-4432-89b4-75f56104affc.png)
![Screenshot_20221209_221507_com tencent tim](https://user-images.githubusercontent.com/59076088/206724421-b77ba55a-6428-4cd0-932f-22559d5677c1.jpg)



## 感谢

- https://github.com/takayama-lily/oicq
- https://github.com/transitive-bullshit/chatgpt-api
- https://chat.openai.com/

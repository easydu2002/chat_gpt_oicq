![YQ`@SO_A@57DC@T$PU95MSO](https://user-images.githubusercontent.com/59076088/208228558-797a6bca-c794-4173-8d0d-176f8e9d90d6.png)


# OpenAI QQBot

基于OpenAI官方API的QQ聊天机器人

详细指南另见 [Wiki~~](https://github.com/easydu2002/chat_gpt_oicq/wiki)


<img src="https://img.shields.io/github/repo-size/easydu2002/chat_gpt_oicq?color=green" alt="dependency-version" /> <img src="https://img.shields.io/github/package-json/dependency-version/easydu2002/chat_gpt_oicq/openai?color=black" alt="dependency-version" /> <img src="https://img.shields.io/github/package-json/dependency-version/easydu2002/chat_gpt_oicq/oicq" alt="dependency-version" /> <img src="https://img.shields.io/github/package-json/dependency-version/easydu2002/chat_gpt_oicq/chatgpt" alt="dependency-version" />



## ✨当前功能

- 一键启动，多端支持，易部署。
- 支持私聊、群聊、频道。
- ~~友好的~~配置项，支持自定义人格。
- 命令系统。
- ~~三方API（免费但慢）~~



## 🚀快速启动

1. 前往 [releases](https://github.com/easydu2002/chat_gpt_oicq/releases) 下载对应平台的可执行文件。
2. 运行可执行文件。
3. 聊天时，私聊会直接回答，群聊需要at机器人。

其他详细过程请参照Wiki中的 [入门指南](https://github.com/easydu2002/chat_gpt_oicq/wiki/%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)。

## ⚙快速设置

1. 如何更改部分设置？<br>
命令系统：内置的命令系统可以更改设置。具体命令帮助可以在聊天中发送 `/help` 获得解释。<br>
手动更改：你的所有设置都在config.json中，包括你的登陆信息，以及API的部分参数等。每一项的具体意义参见 Wiki 中的[配置详解](https://github.com/easydu2002/chat_gpt_oicq/wiki/%E9%85%8D%E7%BD%AE%E8%AF%A6%E8%A7%A3)。


2. 如何设置人格？<br>
在config.json中官方API里有一个设置项identity，其可以用多种方法设置身份。这样功能非常强大，很具有可玩性。具体怎样的文字合适，可以参考 Wiki 中的[设定AI人格 以猫娘为案例](https://github.com/easydu2002/chat_gpt_oicq/wiki/%E8%AE%BE%E5%AE%9AAI%E4%BA%BA%E6%A0%BC---%E4%BB%A5%E7%8C%AB%E5%A8%98%E4%B8%BA%E6%A1%88%E4%BE%8B%E3%80%90chatGPT%E7%8C%AB%E5%A8%98%E3%80%91)，[配置详解#2](https://github.com/easydu2002/chat_gpt_oicq/wiki/%E9%85%8D%E7%BD%AE%E8%AF%A6%E8%A7%A3#2-openai-%E6%A6%82%E8%BF%B0)中对OpenAI文档的翻译理解，以及分享讨论文案的[issue#10](https://github.com/easydu2002/chat_gpt_oicq/issues/10)


## 👀效果
![image](https://user-images.githubusercontent.com/59076088/206843285-9fdf53e6-a0c7-4432-89b4-75f56104affc.png)
![example2](https://user-images.githubusercontent.com/44737387/211142091-02118080-434d-4ab3-ba7f-e405e4243213.png)
![example3](https://user-images.githubusercontent.com/44737387/211142130-72d5e8b4-bd7e-42f6-aeda-f3666abcb8ec.jpg)

## 感谢

- https://github.com/takayama-lily/oicq
- https://github.com/transitive-bullshit/chatgpt-api
- https://chat.openai.com/

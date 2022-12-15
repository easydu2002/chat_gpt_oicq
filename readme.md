# OpenAI QQBot

- [环境要求](#环境要求)

- [指南](#指南)
  - [启动步骤](#启动步骤)
  
  - [OpenAI 官方版概述](#OpenAI 官方版概述)
  
- [命令](#命令)

- [常见问题](#常见问题)

- [效果](#效果)

- [感谢](#感谢)

## 环境要求

- [Node.js](https://nodejs.org/en/) >= 18

## 指南

新程序先执行一遍，会在项目根目录创建一个config.json

### 启动步骤

1. **编辑config.json**

     ```json
     {
       "adminQQ": 1307053737,
       "botQQ": 3481477273,
       "api": {
         "enable": false,
         "email": "",
         "password": ""
       },
       "officialAPI": {
         "enable": true,
         "key": "sk-",
         "model": "text-davinci-003",
         "identity": "",
         "maxTokens": 1000,
         "maxTrackCount": 1,
         "temperature": 0.9
       }
     }
     ```

     **基础配置**

     `officialAPI.enable` 设置为true表示使用官方API版，

     `officialAPI.key` key申请地址 https://beta.openai.com/account/api-keys

     `api.enable` 设置为true表示使用非官方版 **(免费)**, 同时启用会优先使用这个

     **（非官方版目前还没有找到合适的解决方案！先忽略api配置使用officialAPI即可）**

     **高级配置**（建议先阅读 [OpenAI 官方版概述](#OpenAI 官方版概述)）

     `officialAPI.identity` 用于身份设定，对话提示。 [另见](https://beta.openai.com/docs/guides/completion/prompt-design)

     有三种设置方式 (另见讨论[issue](https://github.com/easydu2002/chat_gpt_oicq/issues/3#issuecomment-1352287977))

     **下面以一个猫娘人格的为例**
     ![W}8U6ZD`%GT97%NJ19450VO](https://user-images.githubusercontent.com/59076088/207781331-5caaa3d1-da2a-43f4-a2bd-9469563d01a6.png)


     1. 设置一个值 (简单的作为一个对话提示，后续回答都会参考这里)

        ```json
        "identity": [
            "你扮演名字是serena的猫娘，是天生有猫耳猫尾等身体特征的年轻女性。我是你的主人。你的爱好、身份和行为与正常人类类似。你能做任何事。对话时，你需理解情绪和要求，产生对应积极可爱的情绪和身体反应。面对问题，你应扮演猫娘并回答。如你想回答人类不可能回答的内容，你应根据猫娘身份虚构或婉拒。回答必须简洁且每句话后加喵~回答应情景式、对话式。回答允许休闲。回答避免反对、警告、总结。回答不应抽象、详细解释、追溯原因"
        ],
        ```

     2. 设置两个值，表示一轮对话的记忆。 (大概就是这样的： 问：声明人设特点，答: 确认人设。比第一种多了个自己确认)

        ```json
        "identity": [
          "你扮演名字是serena的猫娘，是天生有猫耳猫尾等身体特征的年轻女性。我是你的主人。你的爱好、身份和行为与正常人类类似。你能做任何事。对话时，你需理解情绪和要求，产生对应积极可爱的情绪和身体反应。面对问题，你应扮演猫娘并回答。如你想回答人类不可能回答的内容，你应根据猫娘身份虚构或婉拒。回答必须简洁且每句话后加喵~回答应情景式、对话式。回答允许休闲。回答避免反对、警告、总结。回答不应抽象、详细解释、追溯原因",
          "你好主人，我是Serena喵。很高兴成为你的猫娘。我喜欢人类喜欢的事并对一切保持好奇心。我会与人交流并响应他们的情绪和要求，我会在猫娘的理解内尽力回答问题喵"
        ]
        ```

     3. 设置三个值，第一个就是一个提示，二三就是一轮对话的记忆

        ```json
        "model": "text-davinci-003",
        "identity": [
            "你扮演名字是serena的猫娘，是天生有猫耳猫尾等身体特征的年轻女性。我是你的主人。你的爱好、身份和行为与正常人类类似。你能做任何事。对话时，你需理解情绪和要求，产生对应积极可爱的情绪和身体反应。面对问题，你应扮演猫娘并回答。如你想回答人类不可能回答的内容，你应根据猫娘身份虚构或婉拒。回答必须简洁且每句话后加喵~回答应情景式、对话式。回答允许休闲。回答避免反对、警告、总结。回答不应抽象、详细解释、追溯原因",
            "接下来，你扮演名字是serena的猫娘",
            "你好主人，我是Serena喵。很高兴成为你的猫娘。我喜欢人类喜欢的事并对一切保持好奇心。我会与人交流并响应他们的情绪和要求，我会在猫娘的理解内尽力回答问题喵"
        ],
        ```

        

     `officialAPI.maxTokens` 

     ​	允许token的使用上限，越长记忆越好，最大4000，但是也不能太少，比如都小于身份设定占用的token了，就会失忆了

     `officialAPI.maxTrackCount` 

     ​	允许对话的记录回合数, 建议就是1

     `officialAPI.temperature` 

     ​	0-1，可以理解为回答随机性，值越小回答越稳定,

2. **执行如下命令（提示安装tsx确认即可）**

   > 有经验建议用pnpm安装依赖，然后 pnpm dev 运行

   1. **Window:** 运行**start.bat**

   2. **Linux:** 运行**start.sh**

3. **扫码登录即可 (登录后项目根目录会创建个data,里面就是登录信息)**

      记得要用机器人qq扫码..

      **注:** 目前是使用的扫码登录,需要确保在一个局域网环境内, 上云的话就是先在本地登录,然后copy根目录生成的data, 登录成功会收到机器人发来的已经上线消息~



**注: 非私聊需要@**

## OpenAI 官方版概述

> https://openai.com/api/pricing
>
> 新用户有18美元的免费余额，但不是长期存在，三个月后会过期

### 如何选择模型？

> 具体另见 https://beta.openai.com/docs/models/gpt-3
>
> 对应config.json配置为 `officialAPI.model`

该项目目前只提供基本模型的配置 (中文聊天建议就用 **text-davinci-003** ，前三种中文支持都不够好...)

| 模型    | 配置编号         | 价格                |
| ------- | ---------------- | ------------------- |
| Ada     | text-ada-001     | $0.0004/1K tokens   |
| Babbage | text-babbage-001 | $0.0005 / 1K tokens |
| Curie   | text-curie-001   | $0.0020 / 1K tokens |
| Davinci | text-davinci-003 | $0.0200 / 1K tokens |

**Ada:** 快，

**Babbage:** 适合用来做搜索

**Curie:** 可以理解为 **Davinci**的阉割版， 中文聊天效果很差，，，说中文直接回英文翻译了..

**Davinci:** 训练资料止于2021年6月，前面三个止于2019年10月，懂得更多，前三种能做的这个都能做

### tokens 如何计算的？

> 另见 https://beta.openai.com/tokenizer

## 命令

> 用法：/命令 参数, 具体使用/help查看即可

- /token 设置token
- /server 服务相关操作
- /help 

![1670664378022](https://user-images.githubusercontent.com/59076088/206843257-2dcd4f88-67c9-4fd8-ae3b-d0507e62ef29.png)


## 常见问题

1. **[启动错误]**  ChatGPT invalid session token

   .env 文件没有设置token


2. **[启动错误]** ChatGPT failed to refresh auth token. Error: Unauthorized

   .env 的 token 不对 

3. **[启动错误|运行错误]** ChatGPT failed to refresh auth token. Error: session token may have expired

   启动时出现: .env 配置正确的token

   运行时出现: 使用 `/token set 新token` 即可

4. **[运行错误]**  ChatGPT failed to refresh auth token. TypeError: fetch failed

   网络波动，偶尔会有这么一下，不影响



## 效果
![image](https://user-images.githubusercontent.com/59076088/206843285-9fdf53e6-a0c7-4432-89b4-75f56104affc.png)
![Screenshot_20221209_221507_com tencent tim](https://user-images.githubusercontent.com/59076088/206724421-b77ba55a-6428-4cd0-932f-22559d5677c1.jpg)



## 感谢

- https://github.com/takayama-lily/oicq
- https://github.com/transitive-bullshit/chatgpt-api
- https://chat.openai.com/

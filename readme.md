# OepnAI QQBot

- [环境要求](#环境要求)

- [用法](#用法)
  - [非官方版](#非官方版)
  
  - [OpenAI 官方版](#OpenAI 官方版)
  
- [命令](#命令)

- [常见问题](#常见问题)

- [效果](#效果)

- [感谢](#感谢)

## 环境要求

- [Node.js](https://nodejs.org/en/) >= 18

## 指南

### 非官方版(失效)

> token的获取, 另见文章 [ChatGPT 低成本体验与实践](https://editor.csdn.net/md/?articleId=128231073)

1. **项目根目录创建 .env文件（第一次执行也会自动创建这个文件**

   填入以下内容 

      ```env
   adminQQ=1307053737
   qq=3481477273
   token=eyJhbGciOiJxxx
      ```

     **adminQQ**: 管理员QQ，部分命令需要管理员QQ发送才能使用

     **qq**: 机器人QQ

     **token:** 配置token即可 , token获取另见 [ChatGPT 低成本体验与实践](https://blog.csdn.net/qq_25211081/article/details/128231073)

2. **执行如下命令（提示安装tsx确认即可）**

   - **Window:** 运行**start.bat**

   - **Linux:** 运行**start.sh**

3. **扫码登录即可 (登录后项目根目录会创建个data,里面就是登录信息)**

      记得要用机器人qq扫码..

     **注:** 目前是使用的扫码登录,需要确保在一个局域网环境内, 上云的话就是先在本地登录,然后copy根目录生成的data, 登录成功会收到机器人发来的已经上线消息~



**注: 非私聊需要@**

## OpenAI 官方版

> https://openai.com/api/pricing
>
> 新用户有18美元的免费余额，但不是长期存在，三个月后会过期

### 如何选择模型？

> 具体另见 https://beta.openai.com/docs/models/gpt-3

该项目目前只提供基本模型的配置 (中文聊天建议就用 **text-davinci-003** ，前三种中文支持都不够好...)

| 模型    | 代号             | 价格                |
| ------- | ---------------- | ------------------- |
| Ada     | text-ada-001     | $0.0004/1K tokens   | 
| Babbage | text-babbage-001 | $0.0005 / 1K tokens | 
| Curie   | text-curie-001   | $0.0020 / 1K tokens | 
| Davinci | text-davinci-003 | $0.0200 / 1K tokens | 

**Ada: **快，

**Babbage：**适合用来做搜索

**Curie：** 可以理解为 **Davinci**的阉割版， 中文聊天效果很差，，，说中文直接回英文翻译了..

**Davinci：**训练资料止于2021年6月，前面三个止于2019年10月，懂得更多，前三种能做的这个都能做

****



### tokens 如何计算的？

> 另见 https://beta.openai.com/tokenizer

中文的一般汉字为两个tokens，罕见的比如biangbiang面的biang需要占4个tokends(应该是取决于某个编码码表), 中文的标点符号通常会占用2-3个tokens （可以在配置文件默认启用tokens优化，把一些不影响语义的标点换成英文的）

英文通常一个词占一个tokens，比如happy虽然有五个字符但是只占一个tokens

另外空格也会占用一个tokens，tokens优化也会移除不必要的空格



另外为了防止恶意刷tokens，可以在配置文件配置消息上限



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

[TOC]

# 环境要求

- [Node.js](https://nodejs.org/en/) >= 16.8

# 用法

> token的获取, 另见文章 [ChatGPT 低成本体验与实践](https://editor.csdn.net/md/?articleId=128231073)

1.**项目根目录创建 .env文件（第一次执行也会自动创建这个文件）**

   填入以下内容

   ```env
   adminQQ=1307053737
   qq=3481477273
   token=eyJhbGciOiJxxx
   ```

  **adminQQ**: 管理员QQ，部分命令需要管理员QQ发送才能使用

  **qq**: 机器人QQ

  **token:** 配置token即可 , token获取另见 [ChatGPT 低成本体验与实践](https://blog.csdn.net/qq_25211081/article/details/128231073)

2.**执行如下命令（提示安装tsx确认即可）**

   Window: 运行**start.bat** 即可

   Linux: 运行**start.sh**即可

3.**扫码登录即可 (登录后项目根目录会创建个data,里面就是登录信息)**

   记得要用机器人qq扫码..

  **注:** 目前是使用的扫码登录,需要确保在一个局域网环境内, 上云的话就是先在本地登录,然后copy根目录生成的data, 登录成功会收到机器人发来的已经上线消息~



**注: 非私聊需要@**



# 命令

> 用法：/命令 参数, 具体使用/help查看即可

- /token 设置token
- /server 服务相关操作
- /help 

# 常见问题

1.**[启动错误]**  ChatGPT invalid session token

   .env 文件没有设置token

2.**[启动错误]** ChatGPT failed to refresh auth token. Error: Unauthorized

   token 错误 

3.**[启动错误|运行错误]** ChatGPT failed to refresh auth token. Error: session token may have expired

   启动时出现: .env 配置正确的token

   运行时出现: 使用 `/token set 新token` 即可

4.**[运行错误]**  ChatGPT failed to refresh auth token. TypeError: fetch failed

   网络波动，偶尔会有这么一下，不影响



# 效果

![Screenshot_20221209_221507_com tencent tim](https://user-images.githubusercontent.com/59076088/206724421-b77ba55a-6428-4cd0-932f-22559d5677c1.jpg)

import { DiscussMessageEvent, GroupMessageEvent, PrivateMessageEvent } from "oicq";
import { GuildMessage } from "oicq-guild/lib/message";
import { Sender } from "./model/sender";

export type MessageEvent = PrivateMessageEvent | GroupMessageEvent | DiscussMessageEvent | GuildMessage

/**
 * 返回值取决于是否继续， true：继续，false： 中断
 */
export type MessageHandler = (sender: Sender) => boolean | Promise<boolean>

import React from "react";

// import * as utils from "../../utils/TextUtils";
import styles from "../css/ChatHistoryItem.module.css";
import { ChatHistoryTextContent } from "../ChatHistoryTextContent";
export const DefaultChatUser = {
  id: "c05c61eb-65e4-4223-915a-fe72b0c9ece1",
  emailAddress: "user@contoso.com",
  fullName: "Default User",
  online: true,
  isTyping: false,
};

const AuthorRoles = {
  // The current user of the chat.
  User: 0,

  // The bot.
  Bot: 1,

  // The participant who is not the current user nor the bot of the chat.
  Participant: 2,
};
export const ChatHistoryItem = ({ message, messageIndex }) => {
  const isDefaultUser = true;
  // const isMe = isDefaultUser || (message.authorRole === AuthorRoles.User && message.userId === activeUserInfo?.id);
  const isMe = isDefaultUser;
  const isBot = message.authorRole === AuthorRoles.Bot; //봇이면 true 아니면 false
  const user = DefaultChatUser;

  const fullName = user?.fullName ?? "최은재";

  let content;

  content = <ChatHistoryTextContent message={message} />;

  return (
    <div
      className={
        isBot
          ? styles.ChatHistoryItemRoot
          : styles.ChatHistoryItemRootChatHistoryItemRootAlignEnd
      }
      // The following data attributes are needed for CI and testing
      data-testid={`chat-history-item-${messageIndex}`}
      data-username={fullName}
      data-content={message.content}
    >
      {/* class.item이 챗봇일떄!!! */}
      <div
        className={
          isBot ? styles.ChatHistoryItemItem : styles.ChatHistoryItemMe
        }
      >
        {/* <div className={styles.ChatHistoryItemHeader}></div> */}
        {content}
      </div>
    </div>
  );
};

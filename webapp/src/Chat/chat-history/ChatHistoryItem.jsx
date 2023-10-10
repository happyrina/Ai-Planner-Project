// Copyright (c) Microsoft. All rights reserved.
import React, { useState, useEffect } from "react";
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
  // const isMe = isDefaultUser || (message.authorRole === AuthorRoles.User && message.userId === activeUserInfo?.id);

  const isDefaultUser = true;

  // displayedMessage
  //   ? (content = (
  //       <ChatHistoryTextContent
  //         message={{ content: displayedMessage, authorRole: 1 }}
  //       />
  //     ))
  //   : userquestion
  //   ? (content = (
  //       <ChatHistoryTextContent
  //         message={{ content: userquestion, authorRole: 0 }}
  //       />
  //     ))
  //   : ();
  let content = <ChatHistoryTextContent message={message} />;

  const isBot = message.authorRole === AuthorRoles.Bot; //봇이면 true 아니면 false
  return (
    <div
      className={
        isBot
          ? styles.ChatHistoryItemRoot
          : styles.ChatHistoryItemRootChatHistoryItemRootAlignEnd
      }
      // The following data attributes are needed for CI and testing
      data-testid={`chat-history-item-${messageIndex}`}
      data-username={"user"}
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

// Copyright (c) Microsoft. All rights reserved.
import React from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import styles from "../css/ChatHistory.module.css";

export const ChatHistory = ({ messages /*onGetResponse*/ }) => {
  return (
    <div className={styles.root}>
      {messages.map((message, index) => (
        <ChatHistoryItem
          // key={message.timestamp}
          message={message}
          // getResponse={onGetResponse}
          messageIndex={index}
        />
      ))}
    </div>
  );
};

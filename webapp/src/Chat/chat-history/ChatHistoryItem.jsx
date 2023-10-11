// Copyright (c) Microsoft. All rights reserved.
import React from "react";
import styles from "../css/ChatHistoryItem.module.css";
import { ChatHistoryTextContent } from "../ChatHistoryTextContent";
import defaultImage from "../../assets/images/smile.jpeg";
import styled from "styled-components";
export const DefaultChatUser = {
  id: "c05c61eb-65e4-4223-915a-fe72b0c9ece1",
  emailAddress: "user@contoso.com",
  fullName: "Default User",
  online: true,
  isTyping: false,
};

const AuthorRoles = {
  User: 0,

  Bot: 1,

  Suggestion: 2,
};
export const ChatHistoryItem = ({ message, messageIndex }) => {
  const isBot = message.authorRole === AuthorRoles.Bot;

  return message.authorRole === 2 ? (
    <GoalContainer>
      <Img src={defaultImage} alt="goal"></Img>
      <div className="title">{message.title}</div>
      <div className="period">{message.period}</div>
      <div>
        <Addbutton>추가</Addbutton>
      </div>
    </GoalContainer>
  ) : (
    <div
      className={
        isBot
          ? styles.ChatHistoryItemRoot
          : styles.ChatHistoryItemRootChatHistoryItemRootAlignEnd
      }
      data-testid={`chat-history-item-${messageIndex}`}
      data-username={"user"}
      data-content={message.content}
    >
      <div
        className={
          isBot ? styles.ChatHistoryItemItem : styles.ChatHistoryItemMe
        }
      >
        <ChatHistoryTextContent message={message} />
      </div>
    </div>
  );
};

const Img = styled.img`
  width: 150px;
  height: 146px;
  object-fit: cover;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const GoalContainer = styled.div`
  width: 187.5px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  margin: 12px 0px;
  padding: 0px 15px;
  div.title {
    width: 100%;
    margin: 2px 0;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    padding-left: 5px;
    padding-top: 3px;
  }
  div.period {
    width: 100%;
    padding-left: 5px;
    margin: 2px 0;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #7e7e7e;
  }
  position: relative;
`;
const Addbutton = styled.button`
  background-color: #6cd3ff;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  color: white;
`;

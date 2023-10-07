// Copyright (c) Microsoft. All rights reserved.
import React, { useState, useEffect, useRef } from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import styles from "../css/ChatHistory.module.css";

export const ChatHistory = ({ messages }) => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const scrollViewTargetRef = useRef();
  React.useEffect(() => {
    if (!shouldAutoScroll) return;
    scrollViewTargetRef.current?.scrollTo(
      0,
      scrollViewTargetRef.current.scrollHeight
    );
  }, [messages, shouldAutoScroll]);

  //이 코드는 스크롤뷰의 스크롤 위치를 감지하고, 스크롤 위치가 화면 하단에서 10px 이내에 있는 경우 자동으로 스크롤을 하도록 설정하는 리액트 컴포넌트의 일부입니다. 또한 컴포넌트가 마운트되면 스크롤 이벤트 리스너가 추가되고, 컴포넌트가 언마운트되면 이벤트 리스너가 제거됩니다.
  React.useEffect(() => {
    const on = () => {
      if (!scrollViewTargetRef.current) return;
      const { Top, Height, clientHeight } = scrollViewTargetRef.current;
      const isAtBottom = Top + clientHeight >= Height - 10;
      setShouldAutoScroll(isAtBottom);
    };

    if (!scrollViewTargetRef.current) return;

    const currentScrollViewTarget = scrollViewTargetRef.current;

    currentScrollViewTarget.addEventListener("", on);
    return () => {
      currentScrollViewTarget.removeEventListener("", on);
    };
  }, []);
  return (
    <div ref={scrollViewTargetRef} className={styles.ChatHistoryRoot}>
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

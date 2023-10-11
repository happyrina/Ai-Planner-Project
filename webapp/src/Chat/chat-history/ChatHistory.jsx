// Copyright (c) Microsoft. All rights reserved.
import React, { useState, useRef } from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import styles from "../css/ChatHistory.module.css";

export const ChatHistory = ({ messages }) => {
  const scrollViewTargetRef = useRef();
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  React.useEffect(() => {
    if (!shouldAutoScroll) return;
    scrollViewTargetRef.current?.scrollTo(
      0,
      scrollViewTargetRef.current.scrollHeight
    );
  }, [messages, shouldAutoScroll]);

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
      {messages.length > 1 ? (
        messages.map((message, index) => (
          <ChatHistoryItem message={message} key={index} messageIndex={index} />
        ))
      ) : (
        <ChatHistoryItem message={messages[0]} key={-1} messageIndex={1} />
      )}
    </div>
  );
};

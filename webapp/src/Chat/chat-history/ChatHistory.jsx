// Copyright (c) Microsoft. All rights reserved.

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import React from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";

const useClasses = makeStyles({
  root: {
    ...shorthands.gap(tokens.spacingVerticalM),
    display: "flex",
    flexDirection: "column",
    maxWidth: "900px",
    width: "100%",
    justifySelf: "center",
    ...shorthands.padding("0"),
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
});

// interface ChatHistoryProps {
//     messages: IChatMessage[];
//     onGetResponse: (options: GetResponseOptions) => Promise<void>;
// }

export const ChatHistory = ({ messages, onGetResponse }) => {
  const classes = useClasses();

  return (
    <div className={classes.root}>
      {messages.map((message, index) => (
        <ChatHistoryItem
          // key={message.timestamp}
          message={message}
          getResponse={onGetResponse}
          messageIndex={index}
        />
      ))}
    </div>
  );
};

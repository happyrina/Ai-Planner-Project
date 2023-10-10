// Copyright (c) Microsoft. All rights reserved.

import { Animation } from "@fluentui/react-northstar";
import React from "react";
import styles from "./css/ChatStatus.module.css";
import { TypingIndicator } from "./Typingindicator";

export const ChatStatus = () => {
  return (
    <Animation name="slideInCubic" keyframeParams={{ distance: "2.4rem" }}>
      <div className={styles.ChatStatusRoot}>
        <TypingIndicator />
      </div>
    </Animation>
  );
};

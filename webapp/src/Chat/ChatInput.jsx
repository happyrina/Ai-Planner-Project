// Copyright (c) Microsoft. All rights reserved.

import { useMsal } from "@azure/msal-react";
import React, { useState } from "react";
import { ChatStatus } from "./ChatStatus";
import styles from "./css/ChatInput.module.css";
import TextField from "@mui/material/TextField";

export const ChatInput = ({ isDraggingOver, onDragLeave, onSubmit }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (value) => {
    if (value.trim() === "") {
      return;
    }
    setValue("");
    // RequestAnswer(value).catch((error) => {
    //   const message = `Error submitting chat input: ${error.message}`;
    //   console.log(message);
    // });
    console.log("handling...", value);
    onSubmit(value);
  };

  return (
    <div className={styles.ChatInputRoot}>
      <div className={styles.ChatInputTypingIndicator}>
        <ChatStatus />
      </div>
      <div className={styles.ChatInputContent}>
        <TextField
          id="chat-input"
          maxRows={2}
          minRows={1}
          multiline
          value={value}
          onFocus={() => {
            const chatInput = document.getElementById("chat-input");
            if (chatInput) {
              setValue(chatInput.value);
            }
          }}
          fullWidth
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          variant="outlined"
          label=""
          type="text"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit(value);
            }
          }}
          inputProps={{ maxLength: 1000 }}
          className={styles.ChatInputInput}
        />
        <button
          className={styles.ChatInputSendButton}
          onClick={() => {
            handleSubmit(value);
          }}
          title="Submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.6em"
            viewBox="0 0 512 512"
            fill="#67BBE7"
          >
            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
          </svg>
        </button>
      </div>
    </div>
    // </div >
  );
};

// Copyright (c) Microsoft. All rights reserved.

import { useMsal } from "@azure/msal-react";
import { SendRegular } from "@fluentui/react-icons";
import React, { useRef, useState } from "react";
import { ChatStatus } from "./ChatStatus";
import styles from "./css/ChatInput.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const ChatInput = ({ isDraggingOver, onDragLeave, onSubmit }) => {
  const { instance, inProgress } = useMsal();

  const [value, setValue] = useState("");
  const [recognizer, setRecognizer] = useState();
  // const { importingDocuments } = conversations[selectedId];

  // const documentFileRef = (useRef < HTMLInputElement) | (null > null);
  const textAreaRef = React.useRef < HTMLTextAreaElement > null;

  React.useEffect(() => {
    // async function initSpeechRecognizer() {
    //   const speechService = new SpeechService(
    //     process.env.REACT_APP_BACKEND_URI
    //   );
    //   const response = await speechService.getSpeechTokenAsync(
    //     await AuthHelper.getSKaaSAccessToken(instance, inProgress)
    //   );
    //   if (response.isSuccess) {
    //     const recognizer =
    //       speechService.getSpeechRecognizerAsyncWithValidKey(response);
    //     setRecognizer(recognizer);
    //   }
    // }
    // initSpeechRecognizer();
    // .catch((e) => {
    //     const errorDetails = e instanceof Error ? e.message : String(e);
    //     const errorMessage = `Unable to initialize speech recognizer. Details: ${errorDetails}`;
    //     dispatch(addAlert({ message: errorMessage, type: AlertType.Error }));
    // });
  }, [, /*dispatch*/ instance, inProgress]);

  // React.useEffect(() => {
  //     const chatState = conversations[selectedId];
  //     setValue(false ? COPY.CHAT_DELETED_MESSAGE() : chatState.input);
  // }, [conversations, selectedId]);

  // const handleSpeech = () => {
  //     setIsListening(true);
  //     if (recognizer) {
  //         recognizer.recognizeOnceAsync((result) => {
  //             if (result.reason === speechSdk.ResultReason.RecognizedSpeech) {
  //                 if (result.text && result.text.length > 0) {
  //                     handleSubmit(result.text);
  //                 }
  //             }
  //             setIsListening(false);
  //         });
  //     }
  // };

  const handleSubmit = (value, messageType = 0) => {
    if (value.trim() === "") {
      return; // only submit if value is not empty
    }

    setValue("");
    console.log("handling...", value);
    // dispatch(editConversationInput({ id: selectedId, newInput: "" }));
    // dispatch(
    //   updateBotResponseStatus({
    //     chatId: selectedId,
    //     status: "Calling the kernel",
    //   })
    // );
    //   onSubmit({ value, messageType, chatId: selectedId }).catch((error) => {
    //     const message = `Error submitting chat input: ${error.message}`;
    //     console.log(message);
    //     // dispatch(
    //     //   addAlert({
    //     //     type: "error",
    //     //     message,
    //     //   })
    //     // );
    //   });
    // };

    //   const handleDrop = (e) => {
    //     onDragLeave(e);
    //     void fileHandler.handleImport(
    //       selectedId,
    //       documentFileRef,
    //       undefined,
    //       e.dataTransfer.files
    //     );
    //   };

    return (
      <div className={styles.root}>
        <div className={styles.typingIndicator}>
          <ChatStatus />
        </div>
        {/* <Alerts /> */}
        <div className={styles.content}>
          <TextField
            title="Chat input"
            aria-label="Chat input field. Click enter to submit input."
            ref={textAreaRef}
            id="chat-input"
            // resize="vertical"
            // disabled={conversations[selectedId].disabled}
            className={styles.input}
            value={isDraggingOver ? "Drop your files here" : value}
            //   onDrop={handleDrop}
            onFocus={() => {
              // update the locally stored value to the current value
              const chatInput = document.getElementById("chat-input");
              if (chatInput) {
                setValue(chatInput.value);
              }
              // User is considered typing if the input is in focus
              // dispatch(
              //   updateUserIsTyping({
              //     userId: activeUserInfo?.id,
              //     chatId: selectedId,
              //     isTyping: true,
              //   })
              // );
            }}
            onChange={(_event, data) => {
              if (isDraggingOver) {
                return;
              }

              setValue(data.value);
              // dispatch(editConversationInput({ id: selectedId, newInput: data.value }));
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(value);
              }
            }}
            onBlur={() => {
              // User is considered not typing if the input is not  in focus
              // dispatch(
              //   updateUserIsTyping({
              //     userId: activeUserInfo?.id,
              //     chatId: selectedId,
              //     isTyping: false,
              //   })
              // );
            }}
          />
          <Button
            className={styles.sendbutton}
            title="Submit"
            aria-label="Submit message"
            appearance="transparent"
            icon={<SendRegular />}
            onClick={() => {
              handleSubmit(value);
            }}
          />
        </div>
      </div>
      // </div >
    );
  };
};

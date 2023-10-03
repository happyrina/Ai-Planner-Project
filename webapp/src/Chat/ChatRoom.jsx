// Copyright (c) Microsoft. All rights reserved.

// import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import styles from "./css/ChatRoom.module.css";
import React, { useEffect } from "react";
// import { Constants } from "../Constants";
import { useChat } from "../libs/hooks/useChat";
import { ChatInput } from "./ChatInput.jsx";
import { ChatHistory } from "./chat-history/ChatHistory";

export const ChatRoom = () => {
  const content = `
# heading 1
## heading 2
### heading 3
~~strikethrough~~  

> Blockquote  

**strong**  
*italics*  
***
[Gmail](https://gmail.com)  
***
1. ordered list
2. ordered list
- unordered list
- unordered list`;

  // const messages = conversations[selectedId].messages;
  const messages = [
    { content: content, authorRole: 0 },
    { content: "피곤하다", authorRole: 1 },
    { content: "나도", authorRole: 0 },
  ];

  //   const dispatch = useAppDispatch();
  // const scrollViewTargetRef = React.useRef < HTMLDivElement > null;
  const [shouldAutoScroll, setShouldAutoScroll] = React.useState(true);

  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const onDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const chat = useChat();

  // 이 코드 조각은 shouldAutoScroll이 true이고 새로운 메시지(messages 상태 변경)가 발생할 때마다 스크롤뷰를 자동으로 아래로 스크롤하여 사용자에게 가장 최신 메시지를 보여주는 리액트 컴포넌트의 일부입니다.
  // React.useEffect(() => {
  //   if (!shouldAutoScroll) return;
  // scrollViewTargetRef.current?.scrollTo(
  //     0,
  // scrollViewTargetRef.current.scrollHeight
  //   );
  // }, [messages, shouldAutoScroll]);

  //이 코드는 스크롤뷰의 스크롤 위치를 감지하고, 스크롤 위치가 화면 하단에서 10px 이내에 있는 경우 자동으로 스크롤을 하도록 설정하는 리액트 컴포넌트의 일부입니다. 또한 컴포넌트가 마운트되면 스크롤 이벤트 리스너가 추가되고, 컴포넌트가 언마운트되면 이벤트 리스너가 제거됩니다.
  // React.useEffect(() => {
  //   const onScroll = () => {
  // if (!scrollViewTargetRef.current) return;
  //     const { scrollTop, scrollHeight, clientHeight } =
  // scrollViewTargetRef.current;
  //     const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  //     setShouldAutoScroll(isAtBottom);
  //   };

  // if (!scrollViewTargetRef.current) return;

  // const currentScrollViewTarget = scrollViewTargetRef.current;

  //   currentScrollViewTarget.addEventListener("scroll", onScroll);
  //   return () => {
  //     currentScrollViewTarget.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  const handleSubmit = async (options) => {
    console.log("submitting user chat message");
    const chatInput = {
      // chatId: "우힝힝" as string,
      // timestamp: new Date().getTime(),
      // userId: activeUserInfo?.id as string,
      // userName: activeUserInfo?.username as string,
      content: options.value,
      // type: options.messageType,
      authorRole: "AuthorRoles.User",
    };

    // dispatch(
    //   addMessageToConversationFromUser({ message: chatInput, chatId: "우힝힝" })
    // );

    await chat.getResponse(options);

    setShouldAutoScroll(true);
  };

  return (
    <div
      className={styles.ChatRoomRoot}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <div className={styles.ChatRoomScroll}>
        <div className={styles.ChatRoomRootHistory}>
          <ChatHistory messages={messages} onGetResponse={handleSubmit} />
        </div>
      </div>
      <div className={styles.ChatRoomRootInput}>
        <ChatInput
          isDraggingOver={isDraggingOver}
          onDragLeave={onDragLeave}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

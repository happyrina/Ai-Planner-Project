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
  안녕하세요! 저는 Copple이라고 합니다. 어떤 도움이 필요하신가요?`;
  const ulsan = `울산은 아름다운 해안선과 역사적인 명소로 유명한 도시입니다. 2일 동안 울산에서 즐길 수 있는 몇 가지 추천 명소를 알려드릴게요:

1. 울산 대공원: 대공원은 넓은 잔디밭과 아름다운 꽃들로 가득 차 있어 휴식과 산책하기에 좋은 장소입니다. 또한, 대공원 내에는 동물원과 수목원도 있어 다양한 활동을 즐길 수 있습니다.

2. 울산 동강섬: 동강섬은 울산의 대표적인 관광지로, 아름다운 자연 경관과 해안 풍경을 감상할 수 있습니다. 산책로와 전망대도 마련되어 있어 멋진 사진을 찍을 수 있습니다.

3. 울산 현대자동차박물관: 현대자동차의 역사와 기술을 알 수 있는 박물관으로, 다양한 전시물과 체험 프로그램을 제공합니다. 자동차에 관심이 있다면 꼭 방문해보세요.

4. 울산 울주군청사: 울주군청사는 조선시대의 건축 양식을 간직하고 있는 역사적인 건물입니다. 전통적인 한옥 건축물을 구경하고 울산의 역사와 문화를 배울 수 있습니다.

5. 울산 동백섬: 동백섬은 동백꽃으로 유명한 곳으로, 봄에는 화려한 동백꽃이 피어나는 경치를 감상할 수 있습니다. 또한, 섬 주변에는 해수욕장과 다양한 레스토랑이 있어 휴식과 식사를 즐길 수 있습니다.

이런 명소들을 방문하면서 울산의 아름다운 자연과 역사를 경험해보세요. 즐거운 여행이 되길 바랍니다!`;
  // const messages = conversations[selectedId].messages;
  const messages = [
    { content: content, authorRole: 1 },
    { content: "안녕", authorRole: 0 },
    {
      content:
        "안녕하세요! 어떤 도움이 필요하신가요? 저는 여러분의 계획을 관리하는 데 도움을 줄 수 있습니다. 어떤 일을 도와드릴까요?",
      authorRole: 1,
    },
    { content: "여행 계획좀 짜려고 해", authorRole: 0 },
    {
      content:
        "안녕하세요! 어떤 도움이 필요하신가요? 저는 여러분의 계획을 관리하는 데 도움을 줄 수 있습니다. 어떤 일을 도와드릴까요?",
      authorRole: 1,
    },
    { content: "여행 계획좀 짜려고 해", authorRole: 0 },
    {
      content:
        "물론이죠! 여행 계획을 짜는 것을 도와드릴게요. 먼저 몇 가지 정보를 알려주세요. 여행할 목적지, 여행 기간, 예산, 관심사 등을 알려주시면 그에 맞는 계획을 세울 수 있을 거예요. 어떤 정보를 알려드릴까요?",
      authorRole: 1,
    },
    { content: "울산 2일 여행갈 곳 좀 알려줘", authorRole: 0 },
    {
      content: ulsan,
      authorRole: 1,
    },
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
      {/* <div className={styles.ChatRoomScroll}> */}
      <div className={styles.ChatRoomRootHistory}>
        <ChatHistory messages={messages} onGetResponse={handleSubmit} />
      </div>
      {/* </div> */}
      {/* <div className={styles.ChatRoomRootInput}> */}
      <ChatInput
        isDraggingOver={isDraggingOver}
        onDragLeave={onDragLeave}
        onSubmit={handleSubmit}
      />
      {/* </div> */}
    </div>
  );
};

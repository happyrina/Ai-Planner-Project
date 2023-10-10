// Copyright (c) Microsoft. All rights reserved.

import styles from "./css/ChatRoom.module.css";
import React, { useEffect, useRef, useState } from "react";
import copple from "../assets/cuteco.png";
import { ChatInput } from "./ChatInput.jsx";
import {
  setupSignalRConnectionToChatHub,
  startSignalRConnection,
} from "./ChatApp";
import { ChatHistory } from "./chat-history/ChatHistory";
import { format } from "date-fns";
import axios from "axios";
// import { addMessage } from "./action";
// import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { chatState, responseState } from "../atoms";

export const ChatRoom = () => {
  const scrollViewTargetRef = useRef();
  const [chatlist, setChatlist] = useRecoilState(chatState);
  const [iswaiting, setIswaiting] = useRecoilState(responseState);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [displayedMessage, setDisplayedMessage] = useState("");
  // const [userquestion, setUserquestion] = useRecoilState(questionState);
  // const conversations = useSelector((state) => state.messages);
  const registerSignalREvents = (connection) => {
    connection.on("ReceiveMessage", () => {
      console.log("ReceiveMessage");
      setIswaiting(true);
    });
    connection.on("ReceiveSystemMessage", () => {
      const log = () => {
        console.log("ReceiveSystemMessage");
      };
      log();
    });
    connection.on("ReceiveBotMessageStart", (message) => {
      console.log("start");
    });
    connection.on("ReceiveBotMessage", (message) => {
      const displayNextCharacter = () => {
        if (message === undefined || message === null) return;
        console.log(message);
        setDisplayedMessage((prev) => prev + message);
        setChatlist((prev) => {
          let updatedChatlist = [...prev];
          let lastMessage = updatedChatlist[updatedChatlist.length - 1];
          lastMessage = {
            ...lastMessage,
            content: lastMessage.content + message,
          };
          updatedChatlist[updatedChatlist.length - 1] = lastMessage;

          return updatedChatlist;
        });
      };
      displayNextCharacter();
      // setTimeout(displayNextCharacter, 1);
    });

    connection.on("ReceiveBotMessageComplete", () => {
      console.log("ReceiveBotMessageComplete");
      setIswaiting(false);
      setDisplayedMessage("");
    });
  };

  useEffect(() => {
    const connection = setupSignalRConnectionToChatHub();
    startSignalRConnection(connection);
    registerSignalREvents(connection);
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const ChatHistoryCall = async () => {
    try {
      const response = await axios.get(
        "https://coppletest.azurewebsites.net/api/chat/wonbin",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const messages = response.data.map((item) => ({
        content: item.message,
        authorRole: item.role,
      }));
      console.log(messages[0]);
      return messages;
    } catch (error) {
      console.error("Error making Axios request:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      throw error; // You can re-throw the error to handle it elsewhere if needed.
    }
  };
  const fetchChatHistory = async () => {
    try {
      const messages = await ChatHistoryCall();
      setChatlist(messages);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const RequestAnswer = async (question) => {
    try {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

      const response = await axios.post(
        "https://coppletest.azurewebsites.net/api/chat",
        {
          id: "string",
          userId: "wonbin",
          parentId: "wonbin",
          message: question,
          createdTime: formattedDate,
          role: 0,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // await fetchChatHistory();
    } catch (error) {
      console.error("Error making Axios request:", error);
    }
    //   if (error.response) {
    //     console.error("Response data:", error.response.data);
    //     console.error("Response status:", error.response.status);
    //     console.error("Response headers:", error.response.headers);
  };
  //   throw error; // You can re-throw the error to handle it elsewhere if needed.

  // Empty dependency array to run this effect only on mount
  // useEffect(() => {
  //   // 이곳에서 chatcontent 값을 읽음
  //   //
  // }, [chatcontent]); // chatcontent가 변경될 때만 이 useEffect가 실행됨

  //이제 안쓸것같은 함수임
  // useEffect(() => {
  //   function addMessageWithDelay(index) {
  //     // if (index < chatcontent.length) {
  //     //   setTimeout(() => {
  //     //     setMessages((prevMessages) => [...prevMessages, chatcontent[index]]);
  //     //     addMessageWithDelay(index + 1);
  //     //   }, 3500); // 3-second delay in milliseconds
  //     // }
  //   }

  //   addMessageWithDelay(0);
  // }, [chatcontent]);

  //   const dispatch = useAppDispatch();
  // const ViewTargetRef = React.useRef < HTMLDivElement > null;

  // const [isDraggingOver, setIsDraggingOver] = useState(false);

  // const onDragEnter = (e) => {
  //   e.preventDefault();
  //   setIsDraggingOver(true);
  // };
  // const onDragLeave = (e) => {
  //   e.preventDefault();
  //   setIsDraggingOver(false);
  // };

  // const chat = useChat();

  // 이 코드 조각은 shouldAuto이 true이고 새로운 메시지(messages 상태 변경)가 발생할 때마다 스크롤뷰를 자동으로 아래로 스크롤하여 사용자에게 가장 최신 메시지를 보여주는 리액트 컴포넌트의 일부입니다.
  // React.useEffect(() => {
  //   if (!shouldAutoScroll) return;
  //   scrollViewTargetRef.current?.scrollTo(
  //     0,
  //     scrollViewTargetRef.current.scrollHeight
  //   );
  // }, [shouldAutoScroll]);

  //이 코드는 스크롤뷰의 스크롤 위치를 감지하고, 스크롤 위치가 화면 하단에서 10px 이내에 있는 경우 자동으로 스크롤을 하도록 설정하는 리액트 컴포넌트의 일부입니다. 또한 컴포넌트가 마운트되면 스크롤 이벤트 리스너가 추가되고, 컴포넌트가 언마운트되면 이벤트 리스너가 제거됩니다.
  // React.useEffect(() => {
  //   const on = () => {
  //     if (!scrollViewTargetRef.current) return;
  //     const { Top, Height, clientHeight } = scrollViewTargetRef.current;
  //     const isAtBottom = Top + clientHeight >= Height - 10;
  //     setShouldAutoScroll(isAtBottom);
  //   };

  //   if (!scrollViewTargetRef.current) return;

  //   const currentScrollViewTarget = scrollViewTargetRef.current;

  //   currentScrollViewTarget.addEventListener("", on);
  //   return () => {
  //     currentScrollViewTarget.removeEventListener("", on);
  //   };
  // }, []);

  const handleSubmit = (value) => {
    console.log("submitting user chat message");
    setChatlist((prev) => [
      ...prev,
      { content: value, authorRole: 0 },
      { content: "", authorRole: 1 },
    ]);
    // setUserquestion(value);
    // dispatch(addMessage(usernewMessage));
    RequestAnswer(value);
    setShouldAutoScroll(true);
  };

  return (
    <div
      className={styles.ChatRoomRoot}
      // onDragEnter={onDragEnter}
      // onDragOver={onDragEnter}
      // onDragLeave={onDragLeave}
    >
      {" "}
      <div className={styles.ChatBar}>
        <img style={{ height: "1.8em" }} src={copple}></img>
        <h3>Copple</h3>
      </div>
      <div ref={scrollViewTargetRef} className={styles.ChatRoomRootHistory}>
        <ChatHistory messages={chatlist} onGetResponse={handleSubmit} />
      </div>
      <ChatInput
        // isDraggingOver={isDraggingOver}
        // onDragLeave={onDragLeave}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

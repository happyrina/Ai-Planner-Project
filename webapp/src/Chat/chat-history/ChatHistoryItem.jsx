// Copyright (c) Microsoft. All rights reserved.
// 답변 뜨는 곳!!!!!!!!!!!!!

import {
  Persona,
  Text,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import React from "react";
import { DefaultChatUser } from "../../libs/auth/AuthHelper";
import { useChat } from "../../libs/hooks/useChat";
// import { AuthorRoles } from "../../libs/models/ChatMessage";
import { useAppSelector } from "../../redux/app/hooks";
import { FeatureKeys } from "../../redux/features/app/AppState";
import { Breakpoints, customTokens } from "../../styles";
// import { PromptDialog } from '../prompt-dialog/PromptDialog';
import { TypingIndicator } from "../../typing-indicator/TypingIndicator";
import * as utils from "./../../utils/TextUtils";

import { ChatHistoryTextContent } from "../ChatHistoryTextContent";

const useClasses = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "75%",
    ...shorthands.borderRadius(customTokens.borderRadiusMedium),
    ...Breakpoints.small({
      maxWidth: "100%",
    }),
    ...shorthands.gap(customTokens.spacingHorizontalXS),
  },
  debug: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
  },
  alignEnd: {
    alignSelf: "flex-end",
  },
  persona: {
    paddingTop: customTokens.spacingVerticalS,
  },
  item: {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    backgroundColor: "white",
    color: "black",
    ...shorthands.borderColor("transparent"),
    ...shorthands.borderRadius(customTokens.borderRadiusSmall),
    ...shorthands.padding(
      customTokens.spacingVerticalNone,
      customTokens.spacingHorizontalS
    ),
  },
  me: {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    backgroundImage: "linear-gradient(145deg, #00d2ff 0%, #3a47d5 100%)",
    // backgroundColor: customTokens.colorMeBackground,
    color: "white",
    ...shorthands.borderRadius(customTokens.borderRadiusXLarge),
    ...shorthands.padding(
      customTokens.spacingVerticalNone,
      customTokens.spacingHorizontalS
    ),
  },
  time: {
    color: customTokens.colorNeutralForeground3,
    fontSize: customTokens.fontSizeBase200,
    fontWeight: 400,
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    ...shorthands.gap(customTokens.spacingHorizontalL),
  },
  canvas: {
    width: "100%",
    textAlign: "center",
  },
  image: {
    maxWidth: "250px",
  },
  blur: {
    filter: "blur(5px)",
  },
});

// interface ChatHistoryItemProps {
//     message: IChatMessage;
//     getResponse: (options: GetResponseOptions) => Promise<void>;
//     messageIndex: number;
// }``

export const ChatHistoryItem = ({ message, getResponse, messageIndex }) => {
  const classes = useClasses();

  const chat = useChat();
  const { conversations, selectedId } = useAppSelector(
    (state) => state.conversations
  );
  const { activeUserInfo, features } = useAppSelector((state) => state.app);

  const isDefaultUser = true;
  // const isMe = isDefaultUser || (message.authorRole === AuthorRoles.User && message.userId === activeUserInfo?.id);
  const isMe = isDefaultUser;
  const isBot = message.authorRole === 1; //봇이면 true 아니면 false
  // const isBot = true;
  const user = DefaultChatUser;
  // const user = isDefaultUser
  //     ? DefaultChatUser
  //     : chat.getChatUserById(message.userName, selectedId, conversations[selectedId].users);
  // const fullName = user?.fullName ?? "message.userName";
  const fullName = user?.fullName ?? "최은재";

  const avatar = isBot
    ? { image: { src: conversations[selectedId].botProfilePicture } }
    : isDefaultUser
    ? { idForColor: selectedId, color: "colorful" }
    : { name: fullName, color: "colorful" };

  let content;
  // if (isBot && message.type === ChatMessageType.Plan) {
  //     content = <PlanViewer message={message} messageIndex={messageIndex} getResponse={getResponse} />;
  // } else if (message.type === ChatMessageType.Document) {
  //     content = <ChatHistoryDocumentContent isMe={isMe} message={message} />;
  // } else {
  content =
    isBot && message.content.length === 0 ? (
      <TypingIndicator />
    ) : (
      <ChatHistoryTextContent message={message} />
    );
  // }

  // TODO: [Issue #42] Persistent RLHF, hook up to model
  // Currently for demonstration purposes only, no feedback is actually sent to kernel / model
  // const showShowRLHFMessage =
  //   features[FeatureKeys.RLHF].enabled &&
  //   message.userFeedback === UserFeedback.Requested &&
  //   messageIndex === conversations[selectedId].messages.length - 1 &&
  //   message.userId === "bot";

  return (
    <div
      className={
        isMe ? mergeClasses(classes.root, classes.alignEnd) : classes.root
      }
      // The following data attributes are needed for CI and testing
      data-testid={`chat-history-item-${messageIndex}`}
      data-username={fullName}
      data-content={utils.formatChatTextContent(message.content)}
    >
      {/* {isBot && (
        <Persona
          className={classes.persona}
          avatar={avatar}
          presence={
            !features[FeatureKeys.SimplifiedExperience].enabled && !isMe
              ? { status: "available" }
              : undefined
          }
        />
      )} */}
      {/* class.item이 챗봇일떄!!! */}
      <div className={isMe ? classes.me : classes.item}>
        <div className={classes.header}>
          {/* {!isMe && <Text weight="semibold">{fullName}</Text>} */}
          {/* <Text className={classes.time}>{timestampToDateString(message.timestamp, true)}</Text> */}
          {/* {/* {isBot && <PromptDialog message={message} />} */}
        </div>
        {content}
        {/* {showShowRLHFMessage && (
          <UserFeedbackActions messageIndex={messageIndex} />
        )} */}
      </div>
    </div>
  );
};

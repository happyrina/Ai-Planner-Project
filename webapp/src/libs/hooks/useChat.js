// Copyright (c) Microsoft. All rights reserved.

import { useMsal } from "@azure/msal-react";
import { Constants } from "../../Constants";
// import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
// import {
//   addAlert,
// } from "../../redux/features/app/appSlice";

// import {
//   addConversation,
//   setConversations,
//   setSelectedConversation,
//   deleteConversation
// } from "../../redux/features/conversations/conversationsSlice";
import { AuthHelper } from "../auth/AuthHelper";

import { BotService } from "../services/BotService";
import { ChatService } from "../services/ChatService";
// import { DocumentImportService } from "../services/DocumentImportService";

// import { FeatureKeys } from "../../redux/features/app/AppState";




export const useChat = () => {
  // const dispatch = useAppDispatch();
  const { instance, inProgress } = useMsal();
  // const { conversations } = useAppSelector(
  //   (state) => state.conversations
  // );
  // const { activeUserInfo, features } = useAppSelector(
  //   (state) => state.app
  // );

  const botService = new BotService(
    process.env.REACT_APP_BACKEND_URI
  );
  const chatService = new ChatService(
    process.env.REACT_APP_BACKEND_URI
  );
  // const documentImportService = new DocumentImportService(
  //   process.env.REACT_APP_BACKEND_URI)

  //   const botProfilePictures: string[] = [
  //     botIcon1,
  //     botIcon2,
  //     botIcon3,
  //     botIcon4,
  //     botIcon5,
  //   ];

  // const userId = activeUserInfo?.id ?? "";
  // const fullName = activeUserInfo?.username ?? "";
  // const emailAddress = activeUserInfo?.email ?? "";
  // const loggedInUser = {
  //   id: userId,
  //   fullName,
  //   emailAddress,
  //   photo: undefined, // TODO: [Issue #45] Make call to Graph /me endpoint to load photo
  //   online: true,
  //   isTyping: false,
  // };

  // const { plugins } = useAppSelector((state) => state.plugins);

  const getChatUserById = (id, chatId, users) => {
    if (id === `${chatId}-bot` || id.toLocaleLowerCase() === "bot")
      return Constants.bot.profile;
    return users.find((user) => user.id === id);
  };

  const createChat = async () => {
    const chatTitle = `Copilot @ ${new Date().toLocaleString()}`;
    try {
      await chatService
        .createChatAsync(
          chatTitle,
          await AuthHelper.getSKaaSAccessToken(instance, inProgress)
        )
        .then((result) => {
          const newChat = {
            id: result.chatSession.id,
            title: result.chatSession.title,
            systemDescription: result.chatSession.systemDescription,
            memoryBalance: result.chatSession.memoryBalance,
            messages: [result.initialBotMessage],
            // users: [loggedInUser],
            botProfilePicture: "",
            input: "",
            botResponseStatus: undefined,
            userDataLoaded: false,
            disabled: false,
          };

          // dispatch(addConversation(newChat));
          return newChat.id;
        });
    } catch (e) {
      const errorMessage = `Unable to create new chat. Details: ${getErrorDetails(
        e
      )}`;
      // dispatch(addAlert({ message: errorMessage, type: "error" }));
    }
  };

  const getResponse = async ({
    messageType,
    value,
    chatId,
    contextVariables,
  }) => {
    const ask = {
      input: value,
      variables: [
        {
          key: "chatId",
          value: chatId,
        },
        {
          key: "messageType",
          value: messageType.toString(),
        },
      ],
    };

    if (contextVariables) {
      ask.variables.push(...contextVariables);
    }

    // try {
    //   const askResult = await chatService
    //     .getBotResponseAsync(
    //       ask,
    //       await AuthHelper.getSKaaSAccessToken(instance, inProgress),
    //       getEnabledPlugins()
    //     )
    //     .catch((e) => {
    //       throw e;
    //     });

    // } catch (e) {
    //   dispatch(updateBotResponseStatus({ chatId, status: undefined }));
    //   const errorMessage = `Unable to generate bot response. Details: ${getErrorDetails(
    //     e
    //   )}`;
    //   dispatch(addAlert({ message: errorMessage, type: "error" }));
    // }
  };


  const loadChats = async () => {
    try {
      const accessToken = await AuthHelper.getSKaaSAccessToken(
        instance,
        inProgress
      );
      const chatSessions = await chatService.getAllChatsAsync(
        "wonbin",
        accessToken
      );

      if (chatSessions.length > 0) {
        const loadedConversations = {};
        for (const chatSession of chatSessions) {
          const chatMessages = await chatService.getChatMessagesAsync(
            chatSession.id,
            0,
            100,
            accessToken
          );

          const chatUsers = await chatService.getAllChatParticipantsAsync(
            chatSession.id,
            accessToken
          );

          // if (
          //   !features[FeatureKeys.MultiUserChat].enabled &&
          //   chatUsers.length > 1
          // ) {
          //   continue;
          // }

          loadedConversations[chatSession.id] = {
            id: chatSession.id,
            title: chatSession.title,
            systemDescription: chatSession.systemDescription,
            memoryBalance: chatSession.memoryBalance,
            users: chatUsers,
            messages: chatMessages,
            botProfilePicture: "",
            input: "",
            botResponseStatus: undefined,
            userDataLoaded: false,
            disabled: false,
          };
        }

        // dispatch(setConversations(loadedConversations));
        // dispatch(setSelectedConversation(chatSessions[0].id));
      } else {
        // No chats exist, create first chat window
        await createChat();
      }

      return true;
    } catch (e) {
      const errorMessage = `Unable to load chats. Details: ${getErrorDetails(
        e
      )}`;
      // dispatch(addAlert({ message: errorMessage, type: "error" }));

      return false;
    }
  };





  const getChatMemorySources = async (chatId) => {
    try {
      return await chatService.getChatMemorySourcesAsync(
        chatId,
        await AuthHelper.getSKaaSAccessToken(instance, inProgress)
      );
    } catch (e) {
      const errorMessage = `Unable to get chat files. Details: ${getErrorDetails(
        e
      )}`;
      // dispatch(addAlert({ message: errorMessage, type: "error" }));
    }

    return [];
  };

  const getSemanticMemories = async (chatId, memoryName) => {
    try {
      return await chatService.getSemanticMemoriesAsync(
        chatId,
        memoryName,
        await AuthHelper.getSKaaSAccessToken(instance, inProgress)
      );
    } catch (e) {
      const errorMessage = `Unable to get semantic memories. Details: ${getErrorDetails(
        e
      )}`;
      // dispatch(addAlert({ message: errorMessage, type: "error" }));
    }

    return [];
  };



  /*
   * Once enabled, each plugin will have a custom dedicated header in every Semantic Kernel request
   * containing respective auth information (i.e., token, encoded client info, etc.)
   * that the server can use to authenticate to the downstream APIs
   */
  // const getEnabledPlugins = () => {
  //   return Object.values < Plugin > (plugins).filter((plugin) => plugin.enabled);
  // };

  // const joinChat = async (chatId) => {
  //   try {
  //     const accessToken = await AuthHelper.getSKaaSAccessToken(
  //       instance,
  //       inProgress
  //     );
  //     await chatService
  //       .joinChatAsync(userId, chatId, accessToken)
  //       .then(async (result) => {
  //         // Get chat messages
  //         const chatMessages = await chatService.getChatMessagesAsync(
  //           result.id,
  //           0,
  //           100,
  //           accessToken
  //         );

  //         // Get chat users
  //         const chatUsers = await chatService.getAllChatParticipantsAsync(
  //           result.id,
  //           accessToken
  //         );

  //         const newChat = {
  //           id: result.id,
  //           title: result.title,
  //           systemDescription: result.systemDescription,
  //           memoryBalance: result.memoryBalance,
  //           messages: chatMessages,
  //           users: chatUsers,
  //           botProfilePicture: "",
  //           input: "",
  //           botResponseStatus: undefined,
  //           userDataLoaded: false,
  //           disabled: false,
  //         };

  //         // dispatch(addConversation(newChat));
  //       });
  //   } catch (e) {
  //     const errorMessage = `Error joining chat ${chatId}. Details: ${getErrorDetails(
  //       e
  //     )}`;
  //     return { success: false, message: errorMessage };
  //   }

  //   return { success: true, message: "" };
  // };

  const editChat = async (
    chatId,
    title,
    syetemDescription,
    memoryBalance
  ) => {
    try {
      await chatService.editChatAsync(
        chatId,
        title,
        syetemDescription,
        memoryBalance,
        await AuthHelper.getSKaaSAccessToken(instance, inProgress)
      );
    } catch (e) {
      const errorMessage = `Error editing chat ${chatId}. Details: ${getErrorDetails(
        e
      )}`;
      // dispatch(addAlert({ message: errorMessage, ype: "error" }));
    }
  };

  const getServiceOptions = async () => {
    try {
      return await chatService.getServiceOptionsAsync(
        await AuthHelper.getSKaaSAccessToken(instance, inProgress)
      );
    } catch (e) {
      const errorMessage = `수정중입니다: ${getErrorDetails(e)}`;
      // dispatch(addAlert({ message: errorMessage, type: "error" }));

      return undefined;
    }
  };

  const deleteChat = async (chatId) => {
    await chatService
      .deleteChatAsync(
        chatId,
        await AuthHelper.getSKaaSAccessToken(instance, inProgress)
      )
      .then(() => {
        // dispatch(deleteConversation(chatId));

        // If there is only one chat left, create a new chat
        //   if (Object.keys(conversations).length <= 1) {
        //     void createChat();
        //   }
        // })
        // .catch((e) => {
        //   const errorDetails = (e).message.includes(
        //     "Failed to delete resources for chat id"
        //   )
        //     ? "Some or all resources associated with this chat couldn't be deleted. Please try again."
        //     : `Details: ${(e).message}`;
        // dispatch(
        // addAlert({
        //   message: `Unable to delete chat. ${errorDetails}`,
        //   type: "error",
        //   onRetry: () => void deleteChat(chatId),
        // })
        // );
      });
  };

  return {
    getChatUserById,
    createChat,
    loadChats,
    getResponse,


    getChatMemorySources,
    getSemanticMemories,

    editChat,
    getServiceOptions,
    // deleteChat,
  };
};

function getErrorDetails(e) {
  return e instanceof Error ? e.message : String(e);
}

// export function getFriendlyChatName(convo: ChatState): string {
//   const messages = convo.messages;

//   // Regex to match the Copilot timestamp format that is used as the default chat name.
//   // The format is: 'Copilot @ MM/DD/YYYY, hh:mm:ss AM/PM'.
//   const autoGeneratedTitleRegex =
//     /Copilot @ [0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2} [A,P]M/;
//   const firstUserMessage = messages.find(
//     (message) =>
//       message.authorRole !== AuthorRoles.Bot &&
//       message.type === ChatMessageType.Message
//   );

//   // If the chat title is the default Copilot timestamp, use the first user message as the title.
//   // If no user messages exist, use 'New Chat' as the title.
//   const friendlyTitle = autoGeneratedTitleRegex.test(convo.title)
//     ? firstUserMessage?.content ?? "New Chat"
//     : convo.title;

//   // Truncate the title if it is too long
//   return friendlyTitle.length > 60
//     ? friendlyTitle.substring(0, 60) + "..."
//     : friendlyTitle;
// }

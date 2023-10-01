// Copyright (c) Microsoft. All rights reserved.

import { createSlice } from "@reduxjs/toolkit";
import {
  initialState,
} from "./ConversationsState";

const ChatMessageType = {
  Message: null,
  Plan: null,
  Document: null,
};

const UserFeedback = {
  Unknown: null,
  Requested: null,
  Positive: null,
  Negative: null,
}

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    editConversationTitle: (state, action) => {
      const { id, newTitle } = action.payload;
      state.conversations[id].title = newTitle;
      frontLoadChat(state, id);
    },
    editConversationInput: (state, action) => {
      const { id, newInput } = action.payload;
      state.conversations[id].input = newInput;
    },
    editConversationSystemDescription: (
      state,
      action
    ) => {
      const id = action.payload.id;
      const newSystemDescription = action.payload.newSystemDescription;
      state.conversations[id].systemDescription = newSystemDescription;
    },
    editConversationMemoryBalance: (
      state,
      action
    ) => {
      const id = action.payload.id;
      const newMemoryBalance = action.payload.memoryBalance;
      state.conversations[id].memoryBalance = newMemoryBalance;
    },
    setSelectedConversation: (
      state,
      action
    ) => {
      state.selectedId = action.payload;
    },
    addConversation: (
      state,
      action
    ) => {
      const newId = action.payload.id;
      state.conversations = { [newId]: action.payload, ...state.conversations };
      state.selectedId = newId;
    },
    addUserToConversation: (
      state,
      action
    ) => {
      const { user, chatId } = action.payload;
      state.conversations[chatId].users.push(user);
      state.conversations[chatId].userDataLoaded = false;
    },
    setImportingDocumentsToConversation: (
      state,
      action
    ) => {
      const { importingDocuments, chatId } = action.payload;
      state.conversations[chatId].importingDocuments = importingDocuments;
    },
    setUsersLoaded: (
      state,
      action
    ) => {
      state.conversations[action.payload].userDataLoaded = true;
    },
    /*
     * addMessageToConversationFromUser() and addMessageToConversationFromServer() both update the conversations state.
     * However they are for different purposes. The former action is for updating the conversation from the
     * webapp and will be captured by the SignalR middleware and the payload will be broadcasted to all clients
     * in the same group.
     * The addMessageToConversationFromServer() action is triggered by the SignalR middleware when a response is received
     * from the webapi.
     */
    addMessageToConversationFromUser: (
      state,
      action
    ) => {
      const { message, chatId } = action.payload;
      updateConversation(state, chatId, message);
    },
    addMessageToConversationFromServer: (
      state,
      action
    ) => {
      const { message, chatId } = action.payload;
      updateConversation(state, chatId, message);
    },
    /*
     * updateUserIsTyping() and updateUserIsTypingFromServer() both update a user's typing state.
     * However they are for different purposes. The former action is for updating an user's typing state from
     * the webapp and will be captured by the SignalR middleware and the payload will be broadcasted to all clients
     * in the same group.
     * The updateUserIsTypingFromServer() action is triggered by the SignalR middleware when a state is received
     * from the webapi.
     */
    updateUserIsTyping: (
      state,
      action
    ) => {
      const { userId, chatId, isTyping } = action.payload;
      updateUserTypingState(state, userId, chatId, isTyping);
    },
    updateUserIsTypingFromServer: (
      state,
      action
    ) => {
      const { userId, chatId, isTyping } = action.payload;
      updateUserTypingState(state, userId, chatId, isTyping);
    },
    updateBotResponseStatus: (
      state,
      action
    ) => {
      const { chatId, status } = action.payload;
      const conversation = state.conversations[chatId];
      conversation.botResponseStatus = status;
    },

    deleteConversation: (
      state,
      action
    ) => {
      const keys = Object.keys(state.conversations);
      const id = action.payload;

      // If the conversation being deleted is the selected conversation, select the first remaining conversation
      if (id === state.selectedId) {
        if (keys.length > 1) {
          state.selectedId = id === keys[0] ? keys[1] : keys[0];
        } else {
          state.selectedId = "";
        }
      }

      const { [id]: _, ...rest } = state.conversations;
      state.conversations = rest;
    },
    disableConversation: (
      state,
      action
    ) => {
      const id = action.payload;
      state.conversations[id].disabled = true;
      frontLoadChat(state, id);
      return;
    },
  },
});

// const updateMessagePropertyInSlice = (state, action) => {
//   const {
//     property,
//     value,
//     messageIdOrIndex,
//     chatId,
//     updatedContent,
//     frontLoad,
//   } = action.payload; // Destructure the payload
//   const conversation = state.conversations[chatId];
//   const conversationMessage =
//     typeof messageIdOrIndex === "number"
//       ? conversation.messages[messageIdOrIndex]
//       : conversation.messages.find((m) => m.id === messageIdOrIndex);

//   if (conversationMessage) {
//     conversationMessage[property] = value;
//     if (updatedContent) {
//       conversationMessage.content = updatedContent;
//     }
//   }

//   if (frontLoad) {
//     frontLoadChat(state, chatId);
//   }
// };

const frontLoadChat = (state, id) => {
  const conversation = state.conversations[id];
  const { [id]: _, ...rest } = state.conversations;
  state.conversations = { [id]: conversation, ...rest };
};

const updateConversation = (
  state,
  chatId,
  message
) => {
  const requestUserFeedback =
    message.userId === "bot" && message.type === ChatMessageType.Message;
  state.conversations[chatId].messages.push({
    ...message,
    userFeedback: requestUserFeedback ? UserFeedback.Requested : undefined,
  });
  frontLoadChat(state, chatId);
};

const updateUserTypingState = (
  state,
  userId,
  chatId,
  isTyping
) => {
  const conversation = state.conversations[chatId];
  const user = conversation.users.find((u) => u.id === userId);
  if (user) {
    user.isTyping = isTyping;
  }
};

export const {
  setConversations,
  editConversationTitle,
  editConversationInput,
  editConversationSystemDescription,
  editConversationMemoryBalance,
  setSelectedConversation,
  addConversation,
  setImportingDocumentsToConversation,
  addMessageToConversationFromUser,
  addMessageToConversationFromServer,
  // updateMessagePropertyInSlice,
  updateUserIsTyping,
  updateUserIsTypingFromServer,
  updateBotResponseStatus,
  setUsersLoaded,
  deleteConversation,
  disableConversation,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
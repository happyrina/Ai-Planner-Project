// Copyright (c) Microsoft. All rights reserved.

import { BaseService } from "./BaseService";

export class ChatService extends BaseService {
  createChatAsync = async (title, accessToken) => {
    const body = {
      title,
    };

    const result = await this.getResponseAsync(
      {
        commandPath: "chatSession/create",
        method: "POST",
        body,
      },
      accessToken
    );

    return result;
  };

  getChatAsync = async (chatId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/getChat/${chatId}`,
        method: "GET",
      },
      accessToken
    );

    return result;
  };

  getAllChatsAsync = async (userId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/getAllChats/${userId}`,
        method: "GET",
      },
      accessToken
    );
    return result;
  };

  getChatMessagesAsync = async (chatId, startIdx, count, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/getChatMessages/${chatId}?startIdx=${startIdx}&count=${count}`,
        method: "GET",
      },
      accessToken
    );

    return result.reverse();
  };

  editChatAsync = async (
    chatId,
    title,
    systemDescription,
    memoryBalance,
    accessToken
  ) => {
    const body = {
      id: chatId,
      title,
      systemDescription,
      memoryBalance,
    };

    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/edit`,
        method: "POST",
        body,
      },
      accessToken
    );

    return result;
  };

  deleteChatAsync = async (chatId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/${chatId}`,
        method: "DELETE",
      },
      accessToken
    );

    return result;
  };

  getBotResponseAsync = async (ask, accessToken, enabledPlugins) => {
    if (enabledPlugins && enabledPlugins.length > 0) {
      const openApiSkillVariables = [];
      const customPlugins = [];

      for (const plugin of enabledPlugins) {
        if (plugin.manifestDomain) {
          customPlugins.push({
            nameForHuman: plugin.name,
            nameForModel: plugin.nameForModel,
            authHeaderTag: plugin.headerTag,
            authType: plugin.authRequirements.personalAccessToken
              ? "user_http"
              : "none",
            manifestDomain: plugin.manifestDomain,
          });
        }

        if (plugin.apiProperties) {
          const apiProperties = plugin.apiProperties;

          for (const property in apiProperties) {
            const propertyDetails = apiProperties[property];

            if (propertyDetails.required && !propertyDetails.value) {
              throw new Error(
                `Missing required property ${property} for ${plugin.name} skill.`
              );
            }

            if (propertyDetails.value) {
              openApiSkillVariables.push({
                key: `${property}`,
                value: propertyDetails.value,
              });
            }
          }
        }
      }

      if (customPlugins.length > 0) {
        openApiSkillVariables.push({
          key: `customPlugins`,
          value: JSON.stringify(customPlugins),
        });
      }

      ask.variables = ask.variables
        ? ask.variables.concat(openApiSkillVariables)
        : openApiSkillVariables;
    }

    const result = await this.getResponseAsync(
      {
        commandPath: "chat",
        method: "POST",
        body: ask,
      },
      accessToken,
      enabledPlugins
    );

    return result;
  };

  joinChatAsync = async (userId, chatId, accessToken) => {
    const body = {
      userId,
      chatId,
    };

    await this.getResponseAsync(
      {
        commandPath: `chatParticipant/join`,
        method: "POST",
        body,
      },
      accessToken
    );

    return await this.getChatAsync(chatId, accessToken);
  };

  getChatMemorySourcesAsync = async (chatId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatSession/${chatId}/sources`,
        method: "GET",
      },
      accessToken
    );

    return result;
  };

  getAllChatParticipantsAsync = async (chatId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatParticipant/getAllParticipants/${chatId}`,
        method: "GET",
      },
      accessToken
    );

    const chatUsers = result.map((participant) => ({
      id: participant.userId,
      online: false,
      fullName: "",
      emailAddress: "",
      isTyping: false,
      photo: "",
    }));

    return chatUsers;
  };

  getSemanticMemoriesAsync = async (chatId, memoryName, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `chatMemory/${chatId}/${memoryName}`,
        method: "GET",
      },
      accessToken
    );

    return result;
  };

  getServiceOptionsAsync = async (accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `serviceOptions`,
        method: "GET",
      },
      accessToken
    );

    return result;
  };
}

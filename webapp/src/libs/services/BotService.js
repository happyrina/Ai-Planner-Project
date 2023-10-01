// Copyright (c) Microsoft. All rights reserved.


import { BaseService } from "./BaseService";

export class BotService extends BaseService {
  downloadAsync = async (chatId, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: `bot/download/${chatId}`,
        method: "GET",
      },
      accessToken
    );

    return result;
  };

  uploadAsync = async (bot, accessToken) => {
    const result = await this.getResponseAsync(
      {
        commandPath: "bot/upload",
        method: "POST",
        body: bot,
      },
      accessToken
    );

    return result;
  };
}

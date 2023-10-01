// Copyright (c) Microsoft. All rights reserved.

const noResponseBodyStatusCodes = [202, 204];

export class BaseService {
  constructor(serviceUrl) {
    this.serviceUrl = serviceUrl;
  }

  getResponseAsync = async (request, accessToken, enabledPlugins) => {
    const { commandPath, method, body } = request;
    const isFormData = body instanceof FormData;

    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`,
    });

    if (!isFormData) {
      headers.append("Content-Type", "application/json");
    }

    if (enabledPlugins && enabledPlugins.length > 0) {
      for (const plugin of enabledPlugins) {
        headers.append(
          `x-sk-copilot-${plugin.headerTag}-auth`,
          plugin.authData ?? ""
        );
      }
    }

    try {
      const requestUrl = new URL(commandPath, this.serviceUrl);
      const response = await fetch(requestUrl, {
        method: method ?? "GET",
        body: isFormData ? body : JSON.stringify(body),
        headers,
      });

      if (!response.ok) {
        const responseText = await response.text();

        if (response.status === 504) {
          throw Object.assign(
            new Error(
              "The request timed out. Please try sending your message again."
            )
          );
        }

        const errorMessage = `${response.status}: ${response.statusText}${responseText ? ` => ${responseText}` : ""
          }`;

        throw Object.assign(new Error(errorMessage));
      }

      return noResponseBodyStatusCodes.includes(response.status)
        ? {}
        : await response.json();
    } catch (e) {
      let additionalErrorMsg = "";
      if (e instanceof TypeError) {
        additionalErrorMsg =
          "\n\nPlease check that your backend is running and that it is accessible by the app";
      }
      throw Object.assign(new Error(`${e} ${additionalErrorMsg}`));
    }
  };
}
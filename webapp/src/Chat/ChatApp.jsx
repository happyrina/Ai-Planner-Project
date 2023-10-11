import * as signalR from "@microsoft/signalr";

export const setupSignalRConnectionToChatHub = () => {
  // SignalR 연결 설정
  const hubUrl = new URL("/chathub", "https://coppletest.azurewebsites.net");
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl.toString(), {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      logger: signalR.LogLevel.Warning,
    })
    .withAutomaticReconnect()
    .withHubProtocol(new signalR.JsonHubProtocol())
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.serverTimeoutInMilliseconds = 60000;
  return connection;
};
export const registerCommonSignalConnectionEvents = (connection) => {
  if (connection.state === "Disconnected") {
    const errorMessage =
      "Connection closed due to error. Try refreshing this page to restart the connection";

    console.log(errorMessage);
  } else if (connection.state === "Reconnecting") {
    const errorMessage = "Connection lost due to error. Reconnecting...";

    console.log(errorMessage);
  } else if (connection.state === "Connected") {
    const message =
      "Connection reestablished. Please refresh the page to ensure you have the latest data.";
    console.log(message + ` Connected with connectionId `);
  }
};

export const startSignalRConnection = (connection, id) => {
  connection
    .start()
    .then(() => {
      console.assert(connection.state === "Connected");
      console.log("SignalR connection established");
      connection.send("JoinChatRoom", id);
    })
    .catch((err) => {
      console.assert(connection.state === "Disconnected");
      console.error("SignalR Connection Error: ", err);
      setTimeout(() => {
        startSignalRConnection(connection);
      }, 5000);
    });
};

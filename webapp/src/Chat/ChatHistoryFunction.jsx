import axios from "axios";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { infoState } from "../atoms";

export const ChatHistoryCall = () => {
  const info = useRecoilValue(infoState);
  try {
    const response = axios({
      method: "get",
      url: `https://coppletest.azurewebsites.net/api/chat/${info}`,
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const messages =
      response.data.length >= 2
        ? response.data.map((item) => ({
            content: item.message,
            authorRole: item.role,
          }))
        : response.data;

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

export const RequestAnswer = (question) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  axios({
    method: "post",
    url: `https://coppletest.azurewebsites.net/api/chat`,
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      id: "string",
      parentId: info,
      message: question,
      createdTime: formattedDate,
      role: 0,
    },
  })
    .then((response) => {
      if (response) {
        console.log(response);
        return;
      }
    })
    .catch((error) => {
      console.error("Error making Axios request:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    });
};

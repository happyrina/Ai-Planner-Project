import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import calendaricon from "../assets/calendaricon.svg";
import homeicon from "../assets/homeicon.svg";
import chatboticon from "../assets/chatboticon.svg";
import closeIcon from "../assets/close-icon.svg";
import highlight from "../assets/highlight.png";
import profileIcon from "../assets/profileIcon.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChatRoom } from "../Chat/ChatRoom";
import axios from "axios";
function NavBar() {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  console.log(location);

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  async function getChatList() {
    axios({
      method: "get",
      url: `https://coppletest.azurewebsites.net/api/chat/wonbin`,
      withCredentials: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error making Axios request:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      });
  }
  getChatList();

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.NavBarContainerWrap}>
        <Link to="/home" className={styles.homeicon}>
          <img src={homeicon} className={styles.Icon} alt="홈" />
          {location.pathname === "/home" && (
            <img src={highlight} className={styles.Underline} alt="selected" />
          )}
        </Link>
        <Link to="/main" className={styles.calendaricon}>
          <img src={calendaricon} className={styles.Icon} alt="캘린더" />
          {location.pathname === "/main" && (
            <img src={highlight} className={styles.Underline} alt="selected" />
          )}
        </Link>
        <Link
          to="/profile"
          className={styles.profileIcon}
          onClick={handleProfileClick}
        >
          <img src={profileIcon} className={styles.Icon} alt="Profile" />
          {location.pathname === "/profile" && (
            <img src={highlight} className={styles.Underline} alt="selected" />
          )}
        </Link>
        <div className={styles.chatbotBackground} onClick={toggleChat}>
          <img src={chatboticon} alt="Chatbot" className={styles.chatboticon} />
        </div>
        {showChat && (
          <div className={styles.chatWindow}>
            <div className={styles.ChatBar}>
              <h3>Copple</h3>
            </div>
            <ChatRoom />

            <button className={styles.closeButton} onClick={toggleChat}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

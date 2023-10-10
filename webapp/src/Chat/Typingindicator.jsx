import React from "react";
import typingBalls from "../assets/typing-balls-light.svg";
import styles from "./css/Typingindicator.module.css";

export const TypingIndicator = () => {
  return (
    <div className={styles.IndicatorRoot}>
      <img
        alt="presentation"
        className={styles.IndicatorImage}
        src={typingBalls}
      />
    </div>
  );
};

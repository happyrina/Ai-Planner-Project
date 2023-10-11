import styles from "../css/markdown-styles.module.css";
import styled from "styled-components";
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import * as utils from "../utils/TextUtils";

// markdown css
const StyledContent = styled.div`
  word-wrap: break-word;
  padding:7px 9px;
  }
`;

const customRenderers = {
  // 원하는 요소에 스타일을 적용합니다.
  p: ({ children }) => <p className={styles.reactMarkDown}>{children}</p>,
  ul: ({ children }) => <ul className={styles.reactMarkDown}>{children}</ul>,
  ol: ({ children }) => <ol className={styles.reactMarkDown}>{children}</ol>,
};

export const ChatHistoryTextContent = ({ message }) => {
  if (message.content === null || message.content === undefined) return;
  const content = utils.formatChatTextContent(message.content);

  return (
    <div>
      <StyledContent>
        <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </StyledContent>
    </div>
  );
};

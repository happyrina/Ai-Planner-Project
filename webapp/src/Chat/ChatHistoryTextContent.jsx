import styles from "../css/markdown-styles.module.css";
import styled from "styled-components";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import * as utils from "../utils/TextUtils";
import { useEffect } from "react";

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

// const content = `
// # heading 1
// ## heading 2
// ### heading 3
// ~~strikethrough~~

// > Blockquote

// **strong**
// *italics*
// ***
// [Gmail](https://gmail.com)
// ***
// 1. ordered list
// 2. ordered list
// - unordered list
// - unordered list`;

export const ChatHistoryTextContent = ({ message }) => {
  console.log(message);

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

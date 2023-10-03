import style from "../css/markdown-styles.module.css";
import styled from "styled-components";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import * as utils from "../utils/TextUtils";

// markdown css
const StyledContent = styled.div`
  wordbreak: "break-word";
`;

const customRenderers = {
  // 원하는 요소에 스타일을 적용합니다.
  p: ({ children }) => <p className={style.reactMarkDown}>{children}</p>,
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

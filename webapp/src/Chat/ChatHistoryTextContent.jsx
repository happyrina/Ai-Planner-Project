import style from "../css/markdown-styles.module.css";
import { makeStyles } from "@fluentui/react-components";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import React from "react";

// markdown css
const useClasses = makeStyles({
  content: {
    wordBreak: "break-word",
  },
});

const customRenderers = {
  // 원하는 요소에 스타일을 적용합니다.
  p: ({ children }) => <p className={style.reactMarkDown}>{children}</p>,
};

const content = `
# heading 1
## heading 2
### heading 3
~~strikethrough~~  

> Blockquote  

**strong**  
*italics*  
***
[Gmail](https://gmail.com)  
***
1. ordered list
2. ordered list
- unordered list
- unordered list`;

export const ChatHistoryTextContent = () => {
  const classes = useClasses();
  return (
    <div>
      <div className={classes.content}>
        <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

// ChatAnswer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { IMessage } from "../../../types/message";

interface ChatAnswerProps {
  message: IMessage;
}

const ChatAnswer: React.FC<ChatAnswerProps> = ({ message }) => {
  return (
    <div className="prose min-w-full">
      <ReactMarkdown
        // enable GFM (tables, strikethrough, task lists, etc.)
        remarkPlugins={[remarkGfm]}
        // allow any raw HTML the AI might send
        rehypePlugins={[rehypeRaw]}
      >
        {message.content.replace(/\n/g, "\n\n")}
      </ReactMarkdown>
    </div>
  );
};

export default ChatAnswer;

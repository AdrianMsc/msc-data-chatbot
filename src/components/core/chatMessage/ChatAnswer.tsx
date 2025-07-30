// ChatAnswer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { IMessage } from '../../../types/message';
import { DownloadLink, isDownloadableLink } from './DownloadLink';

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
				components={{
					a: ({ node, href, children, ...props }) => {
						if (href && isDownloadableLink(href)) {
							return (
								<DownloadLink url={href}>
									{children}
								</DownloadLink>
							);
						}
						return <a href={href} {...props}>{children}</a>;
					}
				}}
			>
				{message.content.replace(/\n/g, '\n\n')}
			</ReactMarkdown>
		</div>
	);
};
export default ChatAnswer;

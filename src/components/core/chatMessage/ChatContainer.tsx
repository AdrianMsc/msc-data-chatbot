import { useEffect, useRef } from 'react';
import ChatAnswer from './ChatAnswer';
import ChatMessage from './ChatMessage';
import useChat from '../../../hooks/useChat';
import { deserializeMessage } from '../../../utils/dateUtils';

const ChatContainer = () => {
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const { messages, isLoading } = useChat();

	useEffect(() => {
		// Scroll to bottom when messages change
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div
			ref={chatContainerRef}
			className="flex flex-col w-full lg:w-[80%] xl:w-[70%] h-full gap-4 flex-nowrap overflow-y-scroll"
		>
			{messages.length === 0 ? (
				<div className="text-center text-gray-500 my-4">Start a conversation by typing a message below.</div>
			) : (
				messages.map((message) => {
					const processedMessage = deserializeMessage(message);
					return processedMessage.sender === 'user' ? (
						<ChatMessage key={processedMessage.id} message={processedMessage} />
					) : (
						<ChatAnswer key={processedMessage.id} message={processedMessage} />
					);
				})
			)}
			{isLoading && <div className="self-start px-3 py-2 bg-gray-100 rounded-lg animate-pulse">Thinking...</div>}
		</div>
	);
};

export default ChatContainer;

import { useEffect, useRef } from 'react';
import ChatAnswer from './ChatAnswer';
import ChatMessage from './ChatMessage';

const ChatContainer = () => {
	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, []);

	return (
		<div
			ref={chatContainerRef}
			className="flex flex-col w-full lg:w-[80%] xl:w-[70%] h-full gap-4 flex-nowrap overflow-y-scroll"
		>
			<ChatMessage />
			<ChatAnswer />
			<ChatMessage />
			<ChatAnswer />
			<ChatMessage />
			<ChatAnswer />
		</div>
	);
};

export default ChatContainer;

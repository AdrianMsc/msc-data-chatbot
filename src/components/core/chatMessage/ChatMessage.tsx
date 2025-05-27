import type { Message } from '../../../types/message';

interface ChatMessageProps {
	message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
	return (
		<div className="w-fit max-w-[70%] h-fit px-3 py-2 bg-primary-blue_light self-end rounded-lg chat-message">
			{message.content}
		</div>
	);
};

export default ChatMessage;

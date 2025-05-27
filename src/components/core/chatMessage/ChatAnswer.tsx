import type { Message } from '../../../types/message';

interface ChatAnswerProps {
	message: Message;
}

const ChatAnswer = ({ message }: ChatAnswerProps) => {
	return <div className="w-fit h-fit px-3 py-2 bg-gray-100 self-start rounded-lg chat-message">{message.content}</div>;
};

export default ChatAnswer;

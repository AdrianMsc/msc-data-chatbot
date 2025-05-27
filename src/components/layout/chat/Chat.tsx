import { useState } from 'react';
import ChatContainer from '../../core/chatMessage/ChatContainer';
import InputChat from '../../core/inputChat/InputChat';
import useChat from '../../../hooks/useChat';

const Chat = () => {
	const { clearChat, messages } = useChat();
	const [showConfirm, setShowConfirm] = useState(false);

	const handleClearChat = () => {
		if (messages.length === 0) return;
		setShowConfirm(true);
	};

	const confirmClear = () => {
		clearChat();
		setShowConfirm(false);
	};

	const cancelClear = () => {
		setShowConfirm(false);
	};

	return (
		<section className="flex flex-col items-center flex-1 w-full h-full py-8 flex-nowrap overflow-hidden">
			<div className="w-[80%] h-full flex flex-col items-center place-content-end md:place-content-between overflow-hidden gap-4">
				{/* Header with clear button */}
				{messages.length > 0 && (
					<div className="w-full flex justify-end mb-2">
						<button
							onClick={handleClearChat}
							className="text-sm text-gray-500 hover:text-red-500 transition-colors"
						>
							Clear Chat
						</button>
					</div>
				)}

				{/* Confirmation dialog */}
				{showConfirm && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
							<h3 className="text-lg font-medium mb-2">Clear conversation?</h3>
							<p className="text-gray-600 mb-4">This will delete all messages in this conversation.</p>
							<div className="flex justify-end gap-2">
								<button
									onClick={cancelClear}
									className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
								>
									Cancel
								</button>
								<button
									onClick={confirmClear}
									className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
								>
									Clear
								</button>
							</div>
						</div>
					</div>
				)}

				{/* <FaqContainer /> */}
				<ChatContainer />
				<InputChat />
			</div>
		</section>
	);
};

export default Chat;

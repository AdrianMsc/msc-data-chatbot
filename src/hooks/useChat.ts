import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages, setLoading } from '../store/chatSlice';
import type { RootState } from '../store/store';
import type { IMessage } from '../types/message';
import { serializeMessage } from '../utils/dateUtils';
import { sendMessage } from '../api/sendMessage';

export const useChat = () => {
	const dispatch = useDispatch();
	const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);

	// Send a user message and simulate a bot response
	const handleMessage = useCallback(
		(content: string) => {
			if (!content.trim()) return;

			// Create and add user message
			const userMessage: IMessage = {
				id: Date.now().toString().slice(5), // Generate a unique ID
				auth: 'user-token', // Optional, can be removed if not needed
				content: content.trim(),
				sender: 'user',
				timestamp: new Date()
			};

			sendMessage(userMessage);

			dispatch(addMessage(serializeMessage(userMessage)));

			// Set loading state while "waiting" for bot response
			dispatch(setLoading(true));

			// Simulate bot response (replace with actual API call in production)
			setTimeout(() => {
				const botMessage: IMessage = {
					id: (Date.now() + 1).toString(),
					auth: 'user', // Optional, can be removed if not needed
					content: `This is a simulated response to: "${content.trim()}"`,
					sender: 'bot',
					timestamp: new Date()
				};

				dispatch(addMessage(serializeMessage(botMessage)));
				dispatch(setLoading(false));
			}, 1000);
		},
		[dispatch]
	);

	// Clear all messages
	const clearChat = useCallback(() => {
		dispatch(clearMessages());
	}, [dispatch]);

	return {
		messages,
		isLoading,
		error,
		handleMessage,
		clearChat
	};
};

export default useChat;

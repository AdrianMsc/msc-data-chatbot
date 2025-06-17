import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages, setLoading } from '../store/chatSlice';
import type { RootState } from '../store/store';
import type { IMessage } from '../types/message';
import { serializeMessage } from '../utils/dateUtils';
import { sendMessage } from '../api/sendMessage';
import { sqlInjectionDetector } from '../utils/message/sqlInjectionDetector';

export const useChat = () => {
	const dispatch = useDispatch();
	const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);

	const handleMessage = useCallback(
		async (content: string) => {
			if (!content.trim()) return;
			if (sqlInjectionDetector(content) === true) return; // Prevent SQL injection attempts

			// Create and add user message
			const userMessage: IMessage = {
				id: Date.now().toString().slice(5), // Generate a unique ID
				auth: 'user-token', // Optional, can be removed if not needed
				content: content.trim(),
				sender: 'user',
				timestamp: new Date()
			};

			dispatch(addMessage(serializeMessage(userMessage)));
			// Set loading state while "waiting" for bot response
			dispatch(setLoading(true));

			const response: any = await sendMessage(userMessage);

			const botMessage: IMessage = {
				id: (Date.now() + 1).toString(),
				auth: 'auth-token', // Optional, can be removed if not needed
				content: response?.content || '',
				sender: 'bot',
				timestamp: new Date()
			};

			dispatch(addMessage(serializeMessage(botMessage)));
			dispatch(setLoading(false));
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

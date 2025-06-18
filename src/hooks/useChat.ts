import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages, setError, setLoading, updateLastBotMessage } from '../store/chatSlice';
import type { RootState } from '../store/store';
import type { IMessage } from '../types/message';
import { serializeMessage } from '../utils/dateUtils';
import { sendMessageStream } from '../api/sendMessageStream';
import { sqlInjectionDetector } from '../utils/message/sqlInjectionDetector';

export const useChat = () => {
	const dispatch = useDispatch();
	const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);

	const handleMessage = useCallback(
		async (content: string) => {
			if (!content.trim()) return;
			if (sqlInjectionDetector(content)) return;

			// Create and dispatch user message
			const userMessage: IMessage = {
				id: Date.now().toString().slice(5),
				auth: 'user-token',
				content: content.trim(),
				sender: 'user',
				timestamp: new Date()
			};

			dispatch(addMessage(serializeMessage(userMessage)));
			dispatch(setLoading(true));

			// Create and dispatch empty bot message
			const botMessage: IMessage = {
				id: (Date.now() + 1).toString(),
				auth: 'auth-token',
				content: '',
				sender: 'bot',
				timestamp: new Date()
			};
			dispatch(addMessage(serializeMessage(botMessage)));

			try {
				let receivedFirstChunk = false;
				await sendMessageStream(userMessage, (partialText) => {
					dispatch(updateLastBotMessage(partialText));
					if (!receivedFirstChunk) {
						dispatch(setLoading(false));
						receivedFirstChunk = true;
					}
				});
			} catch (error) {
				dispatch(setError((error as Error).message));
			}
		},
		[dispatch, messages]
	);

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

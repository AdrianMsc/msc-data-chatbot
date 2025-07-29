import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages, setError, setLoading, updateLastBotMessage } from '../store/chatSlice';
import type { RootState } from '../store/store';
import type { IMessage } from '../types/message';
import { serializeMessage } from '../utils/dateUtils';
import { sendMessageWs } from '../api/sendMessageWs';
import { sqlInjectionDetector } from '../utils/message/sqlInjectionDetector';

export const useChat = () => {
	const dispatch = useDispatch();
	const authToken = useSelector((state: RootState) => state.auth.token);
	const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);

	const handleMessage = useCallback(
		async (content: string) => {
			if (!content.trim()) return;
			if (sqlInjectionDetector(content)) return;

			// Create and dispatch user message
			console.log(authToken);
			const userMessage: IMessage = {
				id: Date.now().toString().slice(5),
				authToken: authToken!,
				content: content.trim(),
				sender: 'user',
				timestamp: new Date()
			};

			dispatch(addMessage(serializeMessage(userMessage)));
			dispatch(setLoading(true));

			// Create and dispatch empty bot message
			const botMessage: IMessage = {
				id: (Date.now() + 1).toString(),
				authToken: authToken!,
				content: '',
				sender: 'bot',
				timestamp: new Date()
			};
			dispatch(addMessage(serializeMessage(botMessage)));

			try {
				let receivedFirstChunk = false;
				await sendMessageWs(userMessage, (partialText) => {
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

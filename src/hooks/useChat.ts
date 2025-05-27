import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, clearMessages, setLoading } from '../store/chatSlice';
import type { RootState } from '../store/store';
import type { Message } from '../types/message';
import { serializeMessage } from '../utils/dateUtils';

export const useChat = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state: RootState) => state.chat);

  // Send a user message and simulate a bot response
  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim()) return;

      // Create and add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      dispatch(addMessage(serializeMessage(userMessage)));
      
      // Set loading state while "waiting" for bot response
      dispatch(setLoading(true));

      // Simulate bot response (replace with actual API call in production)
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `This is a simulated response to: "${content.trim()}"`,
          sender: 'bot',
          timestamp: new Date(),
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
    sendMessage,
    clearChat,
  };
};

export default useChat;

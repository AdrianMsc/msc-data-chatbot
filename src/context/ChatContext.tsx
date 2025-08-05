import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ChatContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ChatContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

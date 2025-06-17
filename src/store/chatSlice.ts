import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IMessage } from '../types/message';

interface ChatState {
	messages: IMessage[];
	isLoading: boolean;
	error: string | null;
}

const initialState: ChatState = {
	messages: [],
	isLoading: false,
	error: null
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<IMessage>) => {
			state.messages.push(action.payload);
		},
		setMessages: (state, action: PayloadAction<IMessage[]>) => {
			state.messages = action.payload;
		},
		clearMessages: (state) => {
			state.messages = [];
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		}
	}
});

export const { addMessage, setMessages, clearMessages, setLoading, setError } = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface ConnectionState {
	isOnline: boolean;
}

const initialState: ConnectionState = {
	isOnline: true
};

const connectionSlice = createSlice({
	name: 'connection',
	initialState,
	reducers: {
		setOnline(state) {
			state.isOnline = true;
		},
		setOffline(state) {
			state.isOnline = false;
		}
	}
});

export const { setOnline, setOffline } = connectionSlice.actions;
export default connectionSlice.reducer;

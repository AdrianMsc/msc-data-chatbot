// src/hooks/useChatWs.ts
import { Manager } from 'socket.io-client';
import { store } from '../../store/store';
import { setOffline, setOnline } from '../../store/connectionSlice';

export const getWs = () => {
	const token = store.getState().auth.token;
	const manager = new Manager('http://localhost:3000/chat', {
		transports: ['websocket'],
		query: { token }
	});

	const socket = manager.socket('/chat');

	socket.on('connect', () => {
		store.dispatch(setOnline());
	});
	socket.on('disconnect', () => {
		store.dispatch(setOffline());
	});
	socket.on('error', (error) => {
		console.error('WebSocket error:', error);
		store.dispatch(setOffline());
	});

	return socket;
};

export default getWs;

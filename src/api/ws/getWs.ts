// src/hooks/useChatWs.ts
import { Manager } from 'socket.io-client';
import { store } from '../../store/store';

export const getWs = () => {
	const token = store.getState().auth.token;
	const manager = new Manager('http://localhost:3000/chat', {
		transports: ['websocket'],
		query: { token }
	});

	const socket = manager.socket('/chat');

	socket.on('connect', () => {
		console.log('Connected to WebSocket server');
	});
	socket.on('disconnect', () => {
		console.log('Disconnected from WebSocket server');
	});
	socket.on('error', (error) => {
		console.error('WebSocket error:', error);
	});

	return socket;
};

export default getWs;

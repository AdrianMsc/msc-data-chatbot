// src/hooks/useChatWs.ts
import { Manager } from 'socket.io-client';

export const getWs = () => {
	const manager = new Manager('http://localhost:3000/chat', {
		transports: ['websocket']
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

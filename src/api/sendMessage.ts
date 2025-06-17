import { baseUrl } from '.';
import type { IMessage } from '../types/message';

export const sendMessage = async (message: IMessage): Promise<void> => {
	try {
		const response = await fetch(`${baseUrl}/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message })
		});

		if (!response.ok) {
			throw new Error('Failed to send message');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error sending message:', error);
	}
};

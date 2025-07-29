export interface IMessage {
	id: string;
	authToken: string; // Optional for user messages
	content: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}

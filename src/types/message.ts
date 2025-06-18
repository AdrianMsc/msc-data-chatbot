export interface IMessage {
	id: string;
	auth: string; // Optional for user messages
	content: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}

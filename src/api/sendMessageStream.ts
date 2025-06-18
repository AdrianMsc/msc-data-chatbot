import { baseUrl } from '.';
import type { IMessage } from '../types/message';

/**
 * Sends a message to the backend using Server-Sent Events (SSE) and streams the response.
 * Calls onChunk with the latest accumulated text as each chunk arrives.
 * Returns the full accumulated text when the stream ends.
 */
export const sendMessageStream = async (message: IMessage, onChunk: (text: string) => void): Promise<string> => {
	const response = await fetch(`${baseUrl}/chat`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message })
	});

	if (!response.body) throw new Error('No response body');

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let fullText = '';
	let buffer = '';
	let done = false;

	while (!done) {
		const { value, done: doneReading } = await reader.read();
		done = doneReading;
		if (value) {
			buffer += decoder.decode(value, { stream: true });

			let eventEnd;
			while ((eventEnd = buffer.indexOf('\n\n')) !== -1) {
				const eventStr = buffer.slice(0, eventEnd);
				buffer = buffer.slice(eventEnd + 2);

				const dataLine = eventStr.split('\n').find((line) => line.startsWith('data: '));
				if (dataLine) {
					try {
						const parsed = JSON.parse(dataLine.replace(/^data: /, ''));

						// Handle Node.js-style Buffer object
						let textChunk = '';

						if (parsed?.text?.type === 'Buffer' && Array.isArray(parsed.text.data)) {
							const uint8array = Uint8Array.from(parsed.text.data);
							textChunk = new TextDecoder().decode(uint8array);
						} else if (typeof parsed.text === 'string') {
							textChunk = parsed.text;
						} else if (typeof parsed === 'string') {
							textChunk = parsed;
						}

						for (const char of textChunk) {
							fullText += char;
							onChunk(fullText);
							await new Promise((resolve) => setTimeout(resolve, 15));
						}
					} catch (e) {
						console.error('Failed to parse SSE chunk:', e, dataLine);
					}
				}
			}
		}
	}

	return fullText;
};

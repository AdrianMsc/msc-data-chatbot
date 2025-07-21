import { getWs } from './ws/getWs';
import type { IMessage } from '../types/message';

/**
 * Sends `message` via WebSocket, streams chunks, decodes binary buffers,
 * queues every character, and then “types” them out one by one.
 *
 * onChunk is called for each *new* fullText after each character, so you
 * can render it as a live typing effect.
 */
export const sendMessageWs = (
	message: IMessage,
	onChunk: (text: string) => void,
	typingDelay = 10 // ms delay between characters
): Promise<string> => {
	const socket = getWs();
	if (!socket) {
		return Promise.reject(new Error('WebSocket not connected'));
	}

	const decoder = new TextDecoder();
	let fullText = '';
	const charQueue: string[] = [];
	let processing = false;

	// drains the queue one char at a time
	const processQueue = async () => {
		if (processing) return;
		processing = true;
		while (charQueue.length) {
			fullText += charQueue.shift()!;
			onChunk(fullText);
			// small pause for the “typing” effect
			await new Promise((res) => setTimeout(res, typingDelay));
		}
		processing = false;
	};

	return new Promise((resolve, reject) => {
		const cleanup = () => {
			socket.off('error', onError);
			socket.off('answer', onAnswer);
			socket.off('answer:end', onEnd);
			socket.off('disconnect', onDisconnect);
		};

		const onError = (err: any) => {
			cleanup();
			reject(err);
		};

		const onAnswer = (chunk: ArrayBuffer | Uint8Array | string) => {
			// normalize to string
			let textChunk: string;
			if (typeof chunk === 'string') {
				textChunk = chunk;
			} else if (chunk instanceof ArrayBuffer) {
				textChunk = decoder.decode(new Uint8Array(chunk));
			} else {
				textChunk = decoder.decode(chunk);
			}

			// enqueue each character
			for (const char of textChunk) {
				charQueue.push(char);
			}
			processQueue();
		};

		const onEnd = () => {
			cleanup();
			// ensure all pending chars are processed before resolving
			(async () => {
				await processQueue();
				resolve(fullText);
			})();
		};

		const onDisconnect = () => {
			cleanup();
			resolve(fullText);
		};

		socket.on('error', onError);
		socket.on('answer', onAnswer);
		socket.once('answer:end', onEnd);
		socket.once('disconnect', onDisconnect);

		socket.emit('message', message);
	});
};

export default sendMessageWs;

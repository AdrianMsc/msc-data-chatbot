import { getWs } from './ws/getWs';
import type { IMessage } from '../types/message';

/**
 * Sends `message` via WebSocket, streams chunks, decodes binary buffers,
 * queues every character, and then “types” them out one by one.
 *
 * `onChunk` is called with the full text after each character, to simulate a live typing effect.
 * `onFinish` is called whether the stream ends, errors, or is aborted.
 */
export const sendMessageWs = (
	message: IMessage,
	onChunk: (text: string) => void,
	typingDelay = 10, // milliseconds between characters
	signal?: AbortSignal,
	onFinish?: () => void
): Promise<string> => {
	const socket = getWs();

	if (!socket) {
		onFinish?.();
		return Promise.reject(new Error('WebSocket not connected'));
	}

	const decoder = new TextDecoder();
	let fullText = '';
	const charQueue: string[] = [];
	let processing = false;

	const processQueue = async () => {
		if (processing) return;
		processing = true;

		while (charQueue.length) {
			fullText += charQueue.shift()!;
			onChunk(fullText);
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
			signal?.removeEventListener('abort', onAbort);
			onFinish?.();
		};

		const onError = (err: any) => {
			cleanup();
			reject(err);
		};

		const onAnswer = (chunk: ArrayBuffer | Uint8Array | string) => {
			let textChunk: string;

			if (typeof chunk === 'string') {
				textChunk = chunk;
			} else if (chunk instanceof ArrayBuffer) {
				textChunk = decoder.decode(new Uint8Array(chunk));
			} else {
				textChunk = decoder.decode(chunk);
			}

			for (const char of textChunk) {
				charQueue.push(char);
			}

			processQueue();
		};

		const onEnd = () => {
			cleanup();
			(async () => {
				await processQueue();
				resolve(fullText);
			})();
		};

		const onDisconnect = () => {
			cleanup();
			resolve(fullText);
		};

		const onAbort = () => {
			socket.emit('abort'); // Opcional, si el servidor lo soporta
			cleanup();
			reject(new Error('Message send aborted'));
		};

		// Si el AbortSignal ya viene cancelado
		if (signal?.aborted) {
			onAbort();
			return;
		}

		// Agregamos listener al abort
		signal?.addEventListener('abort', onAbort);

		// Eventos WebSocket
		socket.on('error', onError);
		socket.on('answer', onAnswer);
		socket.once('answer:end', onEnd);
		socket.once('disconnect', onDisconnect);

		// Enviamos el mensaje
		socket.emit('message', message);
	});
};

export default sendMessageWs;

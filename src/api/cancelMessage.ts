import { sendMessageWs } from "./sendMessageWs";
import type { IMessage } from "../types/message";

let controller: AbortController | null = null;
let cleanupFn: (() => void) | null = null;

/**
 * Inicia el envío del mensaje y guarda el AbortController y onFinish
 */
export const startMessage = (
  message: IMessage,
  onChunk: (text: string) => void,
  onFinish: () => void,
  typingDelay = 10
): Promise<string> => {
  controller = new AbortController();
  cleanupFn = onFinish;

  return sendMessageWs(message, onChunk, typingDelay, controller.signal, () => {
    cleanupFn?.(); // Siempre llamamos onFinish al finalizar
    controller = null;
    cleanupFn = null;
  });
};

/**
 * Cancela el mensaje si está en proceso y pone loading en false
 */
export const cancelMessage = () => {
  if (controller) {
    if (!controller.signal.aborted) {
      controller.abort();
    }
    controller = null;
  }

  if (cleanupFn) {
    cleanupFn(); // Se asegura de poner loading en false
    cleanupFn = null;
  }
};

// Helper functions to handle Date serialization/deserialization
export const serializeMessage = (message: any) => {
  if (message.timestamp instanceof Date) {
    return {
      ...message,
      timestamp: message.timestamp.toISOString(),
    };
  }
  return message;
};

export const deserializeMessage = (message: any) => {
  if (typeof message.timestamp === 'string') {
    return {
      ...message,
      timestamp: new Date(message.timestamp),
    };
  }
  return message;
};

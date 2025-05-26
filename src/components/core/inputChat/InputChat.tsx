import styles from './InputChat.module.css';

const InputChat = () => {
	return (
		<div className={styles.inputChat}>
			<input type="text" placeholder="Ask anything" className={styles.input} />
			<button type="submit" className={styles.sendButton}>
				Send
			</button>
		</div>
	);
};

export default InputChat;

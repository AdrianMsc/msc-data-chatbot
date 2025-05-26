import FaqContainer from '../../core/faq/FaqContainer';
import InputChat from '../../core/inputChat/InputChat';
import styles from './Chat.module.css';

const Chat = () => {
	return (
		<section className={styles.mainContainer}>
			<FaqContainer />
			<InputChat />
		</section>
	);
};

export default Chat;

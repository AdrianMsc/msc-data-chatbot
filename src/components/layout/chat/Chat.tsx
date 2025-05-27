import FaqContainer from '../../core/faq/FaqContainer';
import InputChat from '../../core/inputChat/InputChat';

const Chat = () => {
	return (
		<section className="flex flex-col items-center place-content-end md:place-content-between flex-1 w-full h-full p-8 flex-nowrap overflow-hidden">
			<FaqContainer />
			<InputChat />
		</section>
	);
};

export default Chat;

import ChatContainer from '../../core/chatMessage/ChatContainer';
import FaqContainer from '../../core/faq/FaqContainer';
import InputChat from '../../core/inputChat/InputChat';

const Chat = () => {
	return (
		<section className="flex flex-col items-center flex-1 w-full h-full py-8 flex-nowrap overflow-hidden">
			<div className="w-[80%] h-full flex flex-col items-center place-content-end md:place-content-between overflow-hidden gap-4">
				{/* <FaqContainer /> */}
				<ChatContainer />
				<InputChat />
			</div>
		</section>
	);
};

export default Chat;

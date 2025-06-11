import ChatContainer from '../../core/chatMessage/ChatContainer';
import InputChat from '../../core/inputChat/InputChat';

const Chat = () => {
	return (
		<section className="flex flex-col items-center flex-1 w-full h-full pb-4 flex-nowrap overflow-hidden">
			<div className="w-full lg:w-[90%] h-full flex flex-col items-center place-content-end md:place-content-between overflow-hidden gap-4">
				<ChatContainer />
				<InputChat />
			</div>
		</section>
	);
};

export default Chat;

import { useState } from 'react';
import useChat from '../../../hooks/useChat';

const InputChat = () => {
	const [inputValue, setInputValue] = useState('');
	const { sendMessage, isLoading } = useChat();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value);
	};

	interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

	const handleSubmit = (e: HandleSubmitEvent): void => {
		e.preventDefault();
		if (inputValue.trim() && !isLoading) {
			sendMessage(inputValue);
			setInputValue(''); // Clear the input after sending
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-full lg:w-[80%] xl:w-[70%] h-[100px] p-2 bg-white border border-gray-300 rounded-2xl gap-2"
		>
			<input
				type="text"
				value={inputValue}
				onChange={handleChange}
				placeholder="Ask anything"
				className="w-auto h-full px-3 placeholder:text-start placeholder:text-gray-400"
				disabled={isLoading}
			/>
			<button
				type="submit"
				className="self-end px-4 py-1 w-fit h-fit bg-primary-blue text-white border-none rounded-full cursor-pointer font-semibold hover:bg-primary-blue_dark transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
				disabled={!inputValue.trim() || isLoading}
			>
				{isLoading ? 'Sending...' : 'Send'}
			</button>
		</form>
	);
};

export default InputChat;

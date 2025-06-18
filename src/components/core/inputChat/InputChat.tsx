import { useState } from 'react';
import useChat from '../../../hooks/useChat';

const InputChat = () => {
	const [inputValue, setInputValue] = useState('');
	const { handleMessage, isLoading } = useChat();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value);
	};

	interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

	const handleSubmit = (e: HandleSubmitEvent): void => {
		e.preventDefault();
		if (inputValue.trim() && !isLoading) {
			handleMessage(inputValue);
			setInputValue(''); // Clear the input after sending
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col w-[80%] xl:w-[70%] h-[100px] p-2 bg-white rounded-2xl gap-2"
			style={{ border: '1px solid #DBDBDB' }}
		>
			<input
				type="text"
				value={inputValue}
				onChange={handleChange}
				placeholder="Ask anything"
				className="w-auto h-full px-3 placeholder:text-start placeholder:text-gray-400"
				disabled={isLoading}
			/>
			<div className="flex flex-row items-center justify-end gap-2 w-full h-full">
				<button
					type="submit"
					className="self-end px-4 py-1 w-fit h-fit bg-primary-blue text-white border-none rounded-full cursor-pointer font-semibold hover:bg-primary-blue_dark transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
					disabled={!inputValue.trim() || isLoading}
				>
					{isLoading ? 'Sending...' : 'Send'}
				</button>
			</div>
		</form>
	);
};

export default InputChat;

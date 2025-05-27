const InputChat = () => {
	return (
		<div className="flex flex-col w-[80%] lg:w-[60%] h-[100px] p-2 bg-white border border-gray-300 rounded-2xl gap-2">
			<input
				type="text"
				placeholder="Ask anything"
				className="w-auto h-full px-3 placeholder:text-start placeholder:text-gray-400"
			/>
			<button
				type="submit"
				className="self-end py-[0.1rem] px-2 w-fit h-full bg-blue-500 text-white border-none rounded-lg cursor-pointer"
			>
				Send
			</button>
		</div>
	);
};

export default InputChat;

const InputChat = () => {
	return (
		<div className="flex flex-col w-[80%] lg:w-[70%] xl:w-[50%] h-[100px] p-2 bg-white border border-gray-300 rounded-2xl gap-2">
			<input
				type="text"
				placeholder="Ask anything"
				className="w-auto h-full px-3 placeholder:text-start placeholder:text-gray-400"
			/>
			<button
				type="submit"
				className="self-end px-4 py-1 w-fit h-fit bg-primary-blue text-white border-none rounded-lg cursor-pointer font-semibold hover:bg-primary-blue_dark transition duration-200"
			>
				Send
			</button>
		</div>
	);
};

export default InputChat;

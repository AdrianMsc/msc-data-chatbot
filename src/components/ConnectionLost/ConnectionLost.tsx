const ConnectionLost = () => {
	return (
		<div className="text-red-500  content-between bg-red-100 border-red-500 p-4 rounded-lg items-center justify-between h-[80px] self-center w-[80%] flex">
			‼️ The network connection was lost, please try again.
			<button
				onClick={() => window.location.reload()}
				className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 h-10 w-40"
			>
				🔄 Reload Page
			</button>
		</div>
	);
};

export default ConnectionLost;

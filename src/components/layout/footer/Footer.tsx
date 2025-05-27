const Footer = () => {
	return (
		<footer className="flex flex-col items-center w-full p-4 px-6 bg-white justify-between h-fit md:flex-row md:px-15 md:items-end xl:px-20">
			<div className="flex flex-row text-center content-center mt-2">
				<p className="text-xs text-gray-500 whitespace-nowrap self-center">All Rights Reserved</p>
				<span className="px-3 text-gray-300">|</span>
				<p className="text-xs text-gray-500 whitespace-nowrap self-center">
					© 2000 - 2025 MSC Industrial Direct Co., Inc.
				</p>
			</div>
		</footer>
	);
};

export default Footer;

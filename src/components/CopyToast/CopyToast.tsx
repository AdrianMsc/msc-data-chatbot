import { useEffect, useState } from 'react';

const CopyToast = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
		setTimeout(() => {
			setIsVisible(false);
		}, 3000);
	}, []);
	return (
		<div
			className={`p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 top-1 fixed z-50 ${
				isVisible ? 'flex' : 'hidden'
			}`}
			role="alert"
		>
			<span className="font-medium">📄 Prompt copied!</span>
		</div>
	);
};

export default CopyToast;

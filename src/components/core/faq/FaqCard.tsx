import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

interface IFaqCards {
	title?: string;
	description?: string;
	onCopy: (text: string) => void;
}

const FaqCard = ({
	title = 'Faq Title',
	description = 'This is a short description placeholder',
	onCopy
}: IFaqCards) => {
	const handleClick = () => {
		onCopy(description);
	};

	return (
		<div
			className="flex flex-col justify-center max-w-[250px] max-h-[150px] p-4 text-sm rounded-lg bg-white overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
			onClick={handleClick}
		>
			<h3 className="text-lg font-bold">{title}</h3>
			<p className="text-sm text-gray-500">{description}</p>
			<FontAwesomeIcon icon={faCopy} className="text-gray-500 self-end" />
		</div>
	);
};

export default FaqCard;

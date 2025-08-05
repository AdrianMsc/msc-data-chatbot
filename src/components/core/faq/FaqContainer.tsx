import { useState } from 'react';
import { faqsMock } from './consants';
import FaqCard from './FaqCard';
import CopyToast from '../../CopyToast/CopyToast';
import { useChatContext } from '../../../context/ChatContext';

const FaqContainer = () => {
	const [showToast, setShowToast] = useState(false);
	const { setInputValue } = useChatContext();

	const handleCopy = (text: string) => {
		setInputValue(text);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full xl:w-[100%] h-fit max-h-[500px] gap-4 relative">
			<h2 className="text-2xl font-bold text-primary-blue">Frequently Asked</h2>

			<div className="sm:hidden flex flex-col gap-4 items-center justify-center w-full h-fit rounded-lg">
				{faqsMock.slice(0, 2).map((f, index) => (
					<div key={index} className="flex-shrink-0 w-[250px]">
						<FaqCard title={f.title} description={f.description} onCopy={handleCopy} />
					</div>
				))}
			</div>

			<div className="hidden sm:flex flex-row gap-4 flex-wrap justify-center w-full h-fit rounded-lg">
				{faqsMock.map((f, index) => (
					<div key={index} className="flex-shrink-0 w-[250px]">
						<FaqCard title={f.title} description={f.description} onCopy={handleCopy} />
					</div>
				))}
			</div>

			{showToast && <CopyToast />}
		</div>
	);
};

export default FaqContainer;

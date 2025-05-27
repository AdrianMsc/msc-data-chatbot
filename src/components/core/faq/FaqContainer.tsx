import FaqCard from './FaqCard';

const FaqContainer = () => {
	return (
		<div className="hidden md:flex flex-col items-center justify-center w-[80%] h-fit gap-4">
			<h2 className="text-2xl font-bold text-gray-800">Frequently Asked</h2>
			<div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full h-fit rounded-lg">
				<FaqCard />
				<FaqCard />
				<FaqCard />
				<FaqCard />
				<FaqCard />
				<FaqCard />
			</div>
		</div>
	);
};

export default FaqContainer;

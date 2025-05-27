import MscLogo from '../../../assets/brand/MscLogo';

const Header: React.FC = () => {
	return (
		<header className="bg-white shadow-sm py-4 px-5 flex flex-row w-full justify-between items-center sticky top-0 z-40">
			<div className="flex flex-row items-center gap-4 sm:gap-28 lg:gap-[6.6rem] xl:gap-[9.5rem]">
				<MscLogo />
			</div>
			<div className="flex items-center gap-5">{/* your action buttons here */}</div>
		</header>
	);
};

export default Header;

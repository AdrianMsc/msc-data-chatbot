import MscLogo from '../../../assets/brand/MscLogo';
import styles from './Header.module.css';

const Header: React.FC = () => {
	return (
		<header className={styles.navbar}>
			<div className={styles.navbarInner}>
				<MscLogo />
			</div>
			<div className={styles.navbarActions}>{/* your action buttons here */}</div>
		</header>
	);
};

export default Header;

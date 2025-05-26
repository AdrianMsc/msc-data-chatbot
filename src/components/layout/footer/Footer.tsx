import styles from './Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerInfo}>
				<p>All Rights Reserved</p>
				<div className={styles.footerDivider}></div>
				<p>© 2000 - 2025 MSC Industrial Direct Co., Inc.</p>
			</div>
		</footer>
	);
};

export default Footer;

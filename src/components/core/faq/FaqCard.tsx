import styles from './FaqCard.module.css';

const FaqCard = () => {
	return (
		<div className={styles.faqCard}>
			<h3 className={styles.faqTitle}>Faq Title</h3>
			<p className={styles.faqDesc}>
				This is a brief FAQ description. It provides essential information in a concise manner.
			</p>
		</div>
	);
};

export default FaqCard;

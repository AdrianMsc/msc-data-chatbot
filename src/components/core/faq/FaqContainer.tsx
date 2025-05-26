import FaqCard from './FaqCard';
import styles from './FaqContainer.module.css';

const FaqContainer = () => {
	return (
		<div className={styles.faqContainer}>
			<h2 className={styles.faqTitle}>Frequently Asked</h2>
			<div className={styles.faqContent}>
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

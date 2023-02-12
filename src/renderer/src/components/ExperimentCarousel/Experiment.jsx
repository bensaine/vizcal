import styles from './Carousel.module.scss'

export const Experiment = ({ id, displayName, category }) => {
	return (
		<div className={styles.experiment}>
			<span className={styles.title}>{displayName}</span>
			<span className={styles.subtitle}>{category}</span>
		</div>
	)
}

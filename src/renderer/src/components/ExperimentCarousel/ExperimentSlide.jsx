import styles from './ExperimentCarousel.module.scss'

export const ExperimentSlide = ({ id, displayName, category }) => {
	return (
		<div className={styles.experiment}>
			<span className={styles.title}>{displayName}</span>
			{/* <span className={styles.subtitle}>{category}</span> */}
		</div>
	)
}

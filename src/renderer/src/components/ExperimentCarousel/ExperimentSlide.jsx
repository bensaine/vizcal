import styles from './ExperimentCarousel.module.scss'

export const ExperimentSlide = ({ id, displayName, category, image }) => {
	return (
		<div className={styles.experiment}>
			<img className={styles.icon} src={image} alt=""></img>
			<span className={styles.title}>{displayName}</span>

			{/* <span className={styles.subtitle}>{category}</span> */}
		</div>
	)
}

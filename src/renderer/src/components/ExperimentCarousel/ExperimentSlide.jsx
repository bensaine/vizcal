import styles from './ExperimentCarousel.module.scss'

/**
 * Represents a single slide in the experiment carousel.
 *
 * @author Benjamin Saine, Mervin Tounou
 * @component ExperimentSlide
 * @param {string} displayName - The display name of the slide.
 * @param {string} image - The URL of the slide's image.
 * @returns {ReactElement} The JSX element representing the experiment slide.
 */
export const ExperimentSlide = ({ displayName, image }) => {
	return (
		<div className={styles.experiment}>
			<img className={styles.icon} src={image} alt={displayName + ' logo'} />
			<span className={styles.title}>{displayName}</span>
		</div>
	)
}

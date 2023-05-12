import styles from './Home.module.scss'
import { ExperimentCarousel } from '../ExperimentCarousel/ExperimentCarousel'
import { experiments } from '../../data/experiments.js'

/**
 *
 * Renders the home component
 * This component allows the user to create a new experiment or load an existing one.
 * It contains a carousel of 4 different options, each of them representing one experiment.
 *
 * @author Benjamin Saine
 * @component Home
 * @param {Object} props - The component props.
 * @param {Function} props.createNewExperiment - A callback function to create a new experiment.
 *
 * @returns {JSX.Element} The Home component.
 */
export const Home = ({ createNewExperiment }) => {
	const handleLoadExisting = () => {
		window.api.openExperiment()
	}

	return (
		<div className={styles.quickStart}>
			<div className={styles.header}>
				<h1>New Experiment</h1>
				<span>
					... or{' '}
					<span className="link" onClick={handleLoadExisting}>
						load an existing experiment from a file
					</span>
				</span>
			</div>

			<div className={styles.row}>
				<ExperimentCarousel
					slides={experiments}
					onSlideClick={(type) => createNewExperiment(type)}
				></ExperimentCarousel>
			</div>
		</div>
	)
}

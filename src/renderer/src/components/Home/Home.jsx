import styles from './Home.module.scss'
import { useRef } from 'react'
import { ExperimentCarousel } from '../ExperimentCarousel/ExperimentCarousel'
import { experiments } from '../../data/experiments.js'

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

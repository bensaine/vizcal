import styles from './QuickStart.module.scss'
import { useRef } from 'react'
import { Carousel } from '../ExperimentCarousel/Carousel'
import data from '../../data/experiments.json'

export const QuickStart = () => {
	const fileInput = useRef(null)

	const handleLoadExisting = () => {
		fileInput.current.click()
	}

	const loadFile = (e) => {
		const file = e.target.files[0]
		console.log(file)
	}

	return (
		<div className={styles.quickStart}>
			<div className={styles.header}>
				<h1>New Experiment</h1>
				<span>
					... or{' '}
					<span className="link" onClick={handleLoadExisting}>
						load an existing experiment from file
					</span>
				</span>
			</div>

			<div className={styles.row}>
				<h2>Calculus I</h2>
				<Carousel slides={data.cal1}></Carousel>
			</div>
			<div className={styles.row}>
				<h2>Calculus II</h2>
				<Carousel slides={data.cal2}></Carousel>
			</div>
			<input
				type="file"
				id="file"
				ref={fileInput}
				onChange={loadFile}
				style={{ display: 'none' }}
			/>
		</div>
	)
}

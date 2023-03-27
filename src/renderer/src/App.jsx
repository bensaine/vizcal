import styles from './App.module.scss'
import React, { useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { Home } from './components/Home/Home'
import { experiments } from './data/experiments.js'
import { v4 as uuidv4 } from 'uuid'
import { Experiment } from './components/Experiment'

function App() {
	const [openExperiments, setOpenExperiments] = useState([])
	const [focusedExperiment, setFocusedExperiment] = useState('home')

	const createExperiment = (type) => {
		const id = uuidv4()
		localStorage.setItem(id, JSON.stringify({ type: type, payload: {} }))
		setOpenExperiments([...openExperiments, id])
		setFocusedExperiment(id)
	}

	if (window.electron) {
		window.electron.ipcRenderer.on('open-file', (event, experiment) => {
			localStorage.setItem(experiment.id, JSON.stringify(experiment.save))

			if (!openExperiments.includes(experiment.id))
				setOpenExperiments([...openExperiments, experiment.id])

			setFocusedExperiment(experiment.id)
		})

		window.electron.ipcRenderer.on('save-file', async (event, path) => {
			if (focusedExperiment == 'home') return

			const updatePayloadEvent = new CustomEvent('updatePayload:' + focusedExperiment)
			document.dispatchEvent(updatePayloadEvent)
			const experiment = JSON.parse(localStorage.getItem(focusedExperiment))
			console.log(experiment)
			const output = { id: focusedExperiment, save: experiment, sign: 'vizcal' }
			window.api.writeFile(path, JSON.stringify(output))
		})
	}

	return (
		<div className={styles.container}>
			<Nav
				experiments={openExperiments}
				focus={focusedExperiment}
				setFocus={setFocusedExperiment}
			/>
			<WindowContainer>
				{focusedExperiment == 'home' && <Home createNewExperiment={createExperiment} />}
				{openExperiments.map((experiment) => (
					<Experiment
						id={experiment}
						visible={focusedExperiment == experiment}
						key={experiment}
					/>
				))}
			</WindowContainer>
		</div>
	)
}

export default App

import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { Home } from './components/Home/Home'
import { v4 as uuidv4 } from 'uuid'
import { Experiment } from './components/Experiment'
import { Settings } from './components/Settings/Settings'

function App() {
	const [openExperiments, setOpenExperiments] = useState([])
	const [focusedExperiment, setFocusedExperiment] = useState('home')
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'Dark')
	const [font, setFont] = useState(localStorage.getItem('font') ?? 'Helvetica Neue')

	useEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	useEffect(() => {
		localStorage.setItem('font', font)
	}, [font])

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
			if (['home', 'focused'].includes(focusedExperiment)) return

			const updatePayloadEvent = new CustomEvent('updatePayload:' + focusedExperiment)
			document.dispatchEvent(updatePayloadEvent)
			const experiment = JSON.parse(localStorage.getItem(focusedExperiment))
			console.log(experiment)
			const output = { id: focusedExperiment, save: experiment, sign: 'vizcal' }
			window.api.writeFile(path, JSON.stringify(output))
		})
	}

	return (
		<div className={styles.container} data-theme={theme} data-font={font}>
			<Nav
				experiments={openExperiments}
				focus={focusedExperiment}
				setFocus={setFocusedExperiment}
			/>
			<WindowContainer>
				{focusedExperiment == 'home' && <Home createNewExperiment={createExperiment} />}
				{focusedExperiment == 'settings' && (
					<Settings theme={theme} setTheme={setTheme} font={font} setFont={setFont} />
				)}
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

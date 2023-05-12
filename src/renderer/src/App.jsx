import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { Home } from './components/Home/Home'
import { v4 as uuidv4 } from 'uuid'
import { Experiment } from './components/Experiment'
import { Settings } from './components/Settings/Settings'
import { Dialog } from './components/Dialog/Dialog'

function App() {
	const [openExperiments, setOpenExperiments] = useState([])
	const [focusedExperiment, setFocusedExperiment] = useState('home')
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'Dark')
	const [font, setFont] = useState(localStorage.getItem('font') ?? 'Helvetica Neue')
	const [helpOpen, setHelpOpen] = useState(false)

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

	const closeExperiment = (id) => {
		const index = openExperiments.indexOf(id)
		if (index < 0) return

		openExperiments.splice(index, 1)
		setOpenExperiments([...openExperiments])
		setFocusedExperiment(index - 1 >= 0 ? openExperiments[index - 1] : 'home')
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
				closeExperiment={closeExperiment}
				setHelpOpen={setHelpOpen}
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
			<Dialog open={helpOpen} title={'Help Menu'} onClose={() => setHelpOpen(false)}>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</Dialog>
		</div>
	)
}

export default App

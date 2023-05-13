import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { Home } from './components/Home/Home'
import { v4 as uuidv4 } from 'uuid'
import { Experiment } from './components/Experiment'
import { Settings } from './components/Settings/Settings'
import { Dialog } from './components/Dialog/Dialog'
import { experiments } from './data/experiments'

/**
 * The main application component. It manages the creation, focus, and closure of experiments.
 * The component also controls theme and font settings, and displays a dialog for help.
 *
 * @author Benjamin Saine, Mervin Tounou
 * @component
 *
 * @example
 * <App />
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
	const [openExperiments, setOpenExperiments] = useState([])
	const [focusedExperiment, setFocusedExperiment] = useState('home')
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'Dark')
	const [font, setFont] = useState(localStorage.getItem('font') ?? 'Helvetica Neue')
	const [helpOpen, setHelpOpen] = useState(false)

	// Save theme and font settings to local storage
	useEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	useEffect(() => {
		localStorage.setItem('font', font)
	}, [font])

	// Create a new experiment when the user clicks the "New Experiment" button
	const createExperiment = (type) => {
		const id = uuidv4()
		const colors = experiments.find((e) => e.type == type).colors
		const colorsObj = Object.entries(colors).reduce((obj, [key, value]) => {
			obj[key] = value.default
			return obj
		}, {})
		localStorage.setItem(id, JSON.stringify({ type: type, payload: {}, colors: colorsObj }))
		setOpenExperiments([...openExperiments, id])
		setFocusedExperiment(id)
	}

	// Close and purge the experiment with the given id
	const closeExperiment = (id) => {
		const index = openExperiments.indexOf(id)
		if (index < 0) return

		openExperiments.splice(index, 1)
		setOpenExperiments([...openExperiments])
		setFocusedExperiment(index - 1 >= 0 ? openExperiments[index - 1] : 'home')
	}

	// Define the electron event API for opening and saving files
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
				<h2>Introduction to Vizcal</h2>
				<p>
					Visualizing concepts is a great way to learn them. It is also a great way to
					teach them. Vizcal is a tool to help you visualize Calculus concepts.
				</p>
				<p>Here are the application's main functionalities:</p>

				<h3>1- Home menu</h3>
				<p>
					The home menu allows for experiment creation. Experiments are vizualisation
					tools created to clarify calculus concepts. In this menu, you will be able to
					open a new experiment or load an existing one from a file.
				</p>

				<p>
					This application contains 4 different experiments:
					<strong> Limit, Derivative, Riemann Sum, and Arc Length</strong>. Clicking on
					one experiment will create a new instance of it in a new tab.
				</p>
				<p>
					Clicking on "load an existing experiment from a file" will open the file
					explorer and allow you to select a ".viz " type file, which will be opened in a
					new tab.
				</p>

				<h3>2- Experiments</h3>
				<p>
					Each experiment contains an options and a graph section. The options section
					allows you to modify the experiment's parameters. The graph section displays the
					experiment in real time.
				</p>
				<h4>2.1- Limit</h4>
				<p>This experiment focuses on the Epsilon-Delta definition of the limit.</p>

				<h4>2.2- Derivative</h4>
				<p>
					This experiment focuses on introducing the derivative through the concept of
					rise over run.
				</p>

				<h4>2.3- Riemann Sums</h4>
				<p>
					This experiment focuses on introducing the integral through the concept of
					Riemann Sums.
				</p>

				<h4>2.4- Arc Length</h4>
				<p>
					This experiment focuses on using integration to approximate the arc lenght of a
					function.
				</p>
				<p>
					For more information on each experiment, refer to the Help section of that
					experiment.This section is accessed through a question mark button located at
					the top right corner of every experiment's options section.
				</p>

				<h3>3- Settings</h3>
				<p>
					The "Settings" tab is represented by a grear icon found at the bottom left
					corner of the page. There, you will be able to change the application's theme,
					as well as the font.
				</p>

				<h3>4- Menu Bar</h3>
				<p>
					The menu bar located at the top section of the app allows you to open and save
					an experiment using the "file" tab, as well as reload the application and enable
					full screen mode using the "view" tab.
				</p>
				<h3>Additional Features</h3>
				<h4>Collapsable menus</h4>
				<p>
					Each experiment has a collapsable options section. To collapse an options menu,
					click on the collapse button. This button is circular and has a white arrow
					inside of it. It portrudes from the options section onto the graph.
					<br />
					collapsing an options will resize the graph section to fit the whole window.
				</p>
			</Dialog>
		</div>
	)
}

export default App

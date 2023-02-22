import styles from './App.module.scss'
import { useEffect, useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { QuickStart } from './components/QuickStart/QuickStart'
import { Experiment } from './components/Experiment/Experiment'
import { Limit } from './components/Limit'
import { Derivative } from './components/Derivative'
import { Riemann } from './components/Riemann'
import { Arc } from './components/Arc'

function App() {
	const [window, setWindow] = useState('home')

	return (
		<div className={styles.container}>
			<Nav active={window} handleWindowChange={setWindow} />
			<WindowContainer>
				{window == 'home' && <QuickStart />}
				{window == 'lim' && <Limit />}
				{window == 'der' && <Derivative />}
				{window == 'rie' && <Riemann />}
				{window == 'arc' && <Arc />}
			</WindowContainer>
		</div>
	)
}

export default App

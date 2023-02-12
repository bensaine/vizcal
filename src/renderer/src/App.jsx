import styles from './App.module.scss'
import { useState } from 'react'
import { Nav } from './components/Nav/Nav'
import { WindowContainer } from './components/WindowContainer/WindowContainer'
import { QuickStart } from './components/QuickStart/QuickStart'

function App() {
	const [window, setWindow] = useState('home')

	return (
		<div className={styles.container}>
			<Nav active={window} handleWindowChange={setWindow} />
			<WindowContainer>
				<QuickStart />
			</WindowContainer>
		</div>
	)
}

export default App

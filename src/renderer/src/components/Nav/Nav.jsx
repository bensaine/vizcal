import { Home, Settings, HelpCircle } from 'react-feather'
import styles from './Nav.module.scss'
import { NavItem } from './NavItem'
import { useState } from 'react'
import { Dialog } from '../Dialog/Dialog'

export const Nav = ({ experiments, focus, setFocus, closeExperiment }) => {
	const [helpOpen, setHelpOpen] = useState(false)
	const renderHelp = () => {
		return (
			<>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</>
		)
	}
	return (
		<nav className={styles.nav}>
			<ul>
				<li
					className={focus == 'home' ? styles.active : ''}
					onClick={() => setFocus('home')}
				>
					<Home />
				</li>
				{experiments.map((experiment) => (
					<NavItem
						id={experiment}
						focus={focus == experiment}
						onClick={setFocus}
						key={experiment}
						closeExperiment={closeExperiment}
					/>
				))}
			</ul>
			<span
				className={styles.settings + (focus == 'settings' ? ' ' + styles.active : '')}
				onClick={() => setFocus('settings')}
			>
				<Settings />
			</span>
			<span className={styles.helpButton} onClick={() => setHelpOpen(true)}>
				<HelpCircle />
			</span>
			<Dialog open={helpOpen} title={'Help Menu'} onClose={() => setHelpOpen(false)}>
				{renderHelp()}
			</Dialog>
		</nav>
	)
}

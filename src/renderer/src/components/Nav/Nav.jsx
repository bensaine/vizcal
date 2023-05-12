import { Home, Settings, HelpCircle } from 'react-feather'
import styles from './Nav.module.scss'
import { NavItem } from './NavItem'

/**
 * The `Nav` component renders a navigation bar with home, settings, and dynamically rendered experiment navigation items.
 *
 * @author Benjamin Saine
 * @component Nav
 * @param {object} props - The properties passed to the component.
 * @param {string[]} props.experiments - An array of strings representing the unique identifiers of the experiments to be listed in the navigation.
 * @param {string} props.focus - A string representing the currently focused navigation item.
 * @param {function} props.setFocus - A function that updates the currently focused navigation item.
 * @param {function} props.closeExperiment - A function that handles the closing of an experiment.
 * @param {function} props.setHelpOpen - A function that opens the help dialog when invoked.
 * @returns {JSX.Element} The rendered navigation component.
 *
 * @example
 * <Nav
 *    experiments={['experiment1', 'experiment2']}
 *    focus={'home'}
 *    setFocus={setFocusFunction}
 *    closeExperiment={closeExperimentFunction}
 *    setHelpOpen={setHelpOpenFunction}
 * />
 */
export const Nav = ({ experiments, focus, setFocus, closeExperiment, setHelpOpen }) => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li
					className={focus == 'home' ? styles.active : ''}
					onClick={() => setFocus('home')}
				>
					<Home />
				</li>
				{/* For each open experiment, render a nav item */}
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
			{/* help item */}
			<span className={styles.helpButton} onClick={() => setHelpOpen(true)}>
				<HelpCircle />
			</span>
			{/* settings item */}
			<span
				className={styles.settings + (focus == 'settings' ? ' ' + styles.active : '')}
				onClick={() => setFocus('settings')}
			>
				<Settings />
			</span>
		</nav>
	)
}

import { Home, Settings } from 'react-feather'
import styles from './Nav.module.scss'
import { NavItem } from './NavItem'

export const Nav = ({ experiments, focus, setFocus }) => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li
					className={focus == 'home' ? styles.active : ''}
					onClick={() => setFocus('home')}
				>
					<Home/>
				</li>
				{experiments.map((experiment) => (
					<NavItem
						id={experiment}
						focus={focus == experiment}
						onClick={setFocus}
						key={experiment}
					/>
				))}
			</ul>
			<span
				className={styles.settings + (focus == 'settings' ? ' ' + styles.active : '')}
				onClick={() => setFocus('settings')}
			>
				<Settings/>
			</span>
		</nav>
	)
}

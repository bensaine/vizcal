import styles from './Nav.module.scss'

export const Nav = ({ active, handleWindowChange }) => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li
					className={active == 'home' ? styles.active : ''}
					onClick={() => handleWindowChange('home')}
				>
					Home
				</li>
				<li
					className={active == 'cal1' ? styles.active : ''}
					onClick={() => handleWindowChange('cal1')}
				>
					Calculus I
				</li>
				<li
					className={active == 'cal2' ? styles.active : ''}
					onClick={() => handleWindowChange('cal2')}
				>
					Calculus II
				</li>
			</ul>
		</nav>
	)
}

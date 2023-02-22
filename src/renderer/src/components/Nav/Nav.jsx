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
					className={active == 'lim' ? styles.active : ''}
					onClick={() => handleWindowChange('lim')}
				>
					I
				</li>
				<li
					className={active == 'der' ? styles.active : ''}
					onClick={() => handleWindowChange('der')}
				>
					II
				</li>
				<li
					className={active == 'rie' ? styles.active : ''}
					onClick={() => handleWindowChange('rie')}
				>
					III
				</li>
				<li
					className={active == 'arc' ? styles.active : ''}
					onClick={() => handleWindowChange('arc')}
				>
					IIII
				</li>
			</ul>
		</nav>
	)
}

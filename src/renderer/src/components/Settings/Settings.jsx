import styles from './Settings.module.scss'
import { useEffect, useState } from 'react'
import { Dropdown } from '../Controls/Dropdown'

export const Settings = ({ theme, setTheme }) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Settings</h1>
			</div>
			<div className={styles.col}>
				<Dropdown
					label="Theme"
					options={['Dark', 'Light']}
					value={theme}
					onChange={setTheme}
				/>
			</div>
		</div>
	)
}

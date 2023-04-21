import styles from './Settings.module.scss'
import iStyles from '/src/assets/index.css'
import { useEffect, useState } from 'react'
import { Dropdown } from '../Controls/Dropdown'

export const Settings = ({ theme, setTheme, font, setFont }) => {
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
				<Dropdown
					label="Font"
					options={[
						'Roboto',
						'Arial',
						'Verdana',
						'Tahoma',
						'Trebuchet MS',
						'Times New Roman',
						'Georgia',
						'Garamond',
						'Courier New',
						'Brush Script MT'
					]}
					value={font}
					onChange={setFont}
				/>
			</div>
		</div>
	)
}

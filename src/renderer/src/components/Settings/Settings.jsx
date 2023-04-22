import styles from './Settings.module.scss'
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
						'Helvetica Neue',
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

import styles from './Settings.module.scss'
import { Dropdown } from '../Controls/Dropdown'

/**
 * Component allowing the user to select their preferred theme and font.
 *
 * This component contains 2 of the user stories: changing the theme and changing the font.
 * Changes applied in this component also apply to the rest of the program.
 * For example, changing the font will change the font of each experiments, as well as the main menu.
 *
 * @param {string} theme - The selected theme.
 * @param {function} setTheme - The function to set the selected theme.
 * @param {string} font - The selected font.
 * @param {function} setFont - The function to set the selected font.
 * @returns {JSX.Element} The rendered settings component.
 */
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

import { useState } from 'react'
import styles from './Colors.module.scss'
import { Palette } from './Palette'

/**
 * ColorItems is a React component for a single color item within a color picker.
 * It receives an id, title, color, and setColor function as props.
 * The color can be clicked to open a Palette component for color selection.
 *
 * @author Steven Thao
 * @component
 * @example
 * You would typically render this component within a Colors component, passing the required props.
 * <ColorItems id={id} title={title} color={color} setColor={setColor} />
 *
 * @param {Object} props The props for the ColorItems component
 * @param {string} props.id The unique identifier for the color
 * @param {string} props.title The title for the color
 * @param {string} props.color The current color, expressed as a string
 * @param {Function} props.setColor The function to call when a new color is selected
 *
 * @returns {ReactElement} The rendered component
 */
export const ColorItems = ({ id, title, color, setColor }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.colorItem}>
			<span className={styles.optionButtonTitle}>{title}</span>
			<div
				className={styles.color}
				style={{ backgroundColor: color }}
				onClick={() => setOpen(true)}
			></div>

			{/* popup palette selector */}
			{open && <Palette setColor={(color) => setColor(id, color)} setOpen={setOpen} />}
		</div>
	)
}

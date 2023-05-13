import { useEffect, useRef } from 'react'
import styles from './Colors.module.scss'

/**
 * Palette is a React component for a color palette.
 * It receives a setColor function and a setOpen function as props.
 * The palette provides a selection of predefined colors.
 * When a color is clicked, it calls the setColor function with the selected color and closes the palette.
 *
 * @author Steven Thao
 * @component
 * @example
 *
 * You would typically render this component within a ColorItems component, passing the required props.
 * <Palette setColor={setColor} setOpen={setOpen} />
 *
 * @param {Object} props The props for the Palette component
 * @param {Function} props.setColor The function to call when a new color is selected
 * @param {Function} props.setOpen The function to call to open or close the palette
 *
 * @returns {ReactElement} The rendered component
 */
export const Palette = ({ setColor, setOpen }) => {
	const COLORS = ['#ffffff', '#c74440', '#ffc0cb', '#388c46', '#6042a6', '#fa7e19', '#000000']
	const ref = useRef(null)

	// Close the palette when clicking outside of it
	useEffect(() => {
		function onOutsideClick(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setOpen(false)
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', onOutsideClick)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', onOutsideClick)
		}
	}, [ref])

	return (
		<div className={styles.palette} ref={ref}>
			{COLORS.map((color) => (
				<div
					key={color}
					className={styles.color}
					style={{ backgroundColor: color }}
					onClick={() => {
						setColor(color)
						setOpen(false)
					}}
				></div>
			))}
		</div>
	)
}

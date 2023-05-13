import { useEffect, useRef } from 'react'
import styles from './Colors.module.scss'

export const Palette = ({ setColor, setOpen }) => {
	const COLORS = ['#ffffff', '#c74440', '#ffc0cb', '#388c46', '#6042a6', '#fa7e19', '#000000']
	const ref = useRef(null)

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
